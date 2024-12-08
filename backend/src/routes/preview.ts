import getPreviewUrl from "../core/deezer/preview";

const preview = (trackName: string, artistName: string): Promise<string> => {
    return getPreviewUrl(trackName, artistName);
}

export default preview;
