import { envs } from "src/config/envs";

export const generateMapboxImage = (location: any): string => {

    const accessToken = envs.MAPBOX_TOKEN;

    const zoom = 15;
    const width = 800;
    const height = 400;

    const lon = location.coordinates[0];
    const lat = location.coordinates[1];

    return `https://api.mapbox.com/styles/v1/mapbox/light-v11/static/pin-s-l+000(${lon},${lat})/${lon},${lat},${zoom}/${width}x${height}?access_token=${accessToken}`;
}