import supercluster from "supercluster";

/**/
/*

 getZoomLevel

 NAME

   getZoomLevel - Gets the zoom level of the map

 SYNOPSIS

    getZoomLevel(longitudeDelta)

        longitudeDelta -> The longitude delta of the current location (corresponds to zoom level)

 DESCRIPTION

    A function that takes in the longitude delta and calculates the zoom level of the map by performing
    relevant mathematical operations.

 RETURNS

    The zoom level number

 AUTHOR

    Ashmin Bhandari

 DATE

    05/14/2020

 */
/**/
function getZoomLevel(longitudeDelta) {
    const angle = longitudeDelta;
    return Math.round(Math.log(360 / angle) / Math.LN2);
}

/**/
/*

 getCluster

 NAME

   getCluster - Finds out a regions with cluster of markers

 SYNOPSIS

    getCluster(allCoords, region)

        allCoords -> All the coordinates in a list format
        region -> The region from which to find out the cluster of markers constituting of a Javascript object with latitude, longitude, latitudeDelta and longitudeDelta

 DESCRIPTION

    A function that gets all the marker clusters from a region standpoint

 RETURNS

    The cluster and markers

 AUTHOR

    Ashmin Bhandari

 DATE

    05/14/2020

 */
/**/
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