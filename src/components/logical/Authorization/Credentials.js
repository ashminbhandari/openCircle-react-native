import axios from 'axios'

const Credentials = async () => {
    const res = await axios.get('http://10.0.0.226:3000/auth/spotifyCredentials')
    const Credentials = res.data
    return Credentials
}

export default Credentials;