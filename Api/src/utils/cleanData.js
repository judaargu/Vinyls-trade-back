"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanJson = exports.cleanData = void 0;
const cleanData = (data) => {
    const cleanedData = data.map((vinyl) => {
        const min = 5;
        const max = 20;
        const minPrice = 20;
        const maxPrice = 70;
        const randomDecimal = Math.random();
        const stock = Math.floor(randomDecimal * (max - min + 1)) + min;
        const price = Math.floor(randomDecimal * (maxPrice - minPrice + 1) + minPrice);
        const cleanedItem = {
            id: vinyl.id,
            title: vinyl.title,
            year: vinyl.year,
            genre: vinyl.genre.toString(),
            cover_image: vinyl.cover_image,
            style: vinyl.style.toString(),
            stock: stock,
            price: price,
            resource_url: vinyl.resource_url
        };
        return cleanedItem;
    });
    return cleanedData;
};
exports.cleanData = cleanData;
const cleanJson = (data) => {
    const cleanedData = data.map(vinyl => {
        const cleanedArtists = vinyl.artists.map(artist => ({
            name: artist.name
        }));
        const cleanedVideos = Array.isArray(vinyl.videos)
            ? vinyl.videos.map(video => ({
                uri: video.uri
            }))
            : [{ uri: "No videos" }];
        const cleanedItem = {
            id: vinyl.id,
            artists: cleanedArtists,
            artists_sort: vinyl.artists_sort,
            videos: cleanedVideos,
            tracklist: vinyl.tracklist
        };
        return cleanedItem;
    });
    return cleanedData;
};
exports.cleanJson = cleanJson;
