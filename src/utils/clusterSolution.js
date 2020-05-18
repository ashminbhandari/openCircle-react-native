import supercluster from "supercluster";

function getZoomLevel(longitudeDelta) {
    const angle = longitudeDelta;
    return Math.round(Math.log(360 / angle) / Math.LN2);
}

export function getCluster(allCoords, region) {
    const cluster = supercluster({
        radius: 40,
        maxZoom: 16
    });

    const places = allCoords.map(c => ({
        geometry: {
            coordinates: [c.longitude, c.latitude]
        }
    }));

    let markers = [];

    try {
        const padding = 0;

        cluster.load(places);

        markers = cluster.getClusters(
            [
                region.longitude - region.longitudeDelta * (0.5 + padding),
                region.latitude - region.latitudeDelta * (0.5 + padding),
                region.longitude + region.longitudeDelta * (0.5 + padding),
                region.latitude + region.latitudeDelta * (0.5 + padding)
            ],
            getZoomLevel(region.longitudeDelta)
        );
    } catch (e) {
        console.debug("Error while creating cluster at clusterSolution in utils", e);
    }

    return {
        markers,
        cluster
    };
}