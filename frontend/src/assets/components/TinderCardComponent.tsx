import { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";

class MusicTitle {
    name: string;
    artist: string;
    url: string;
    cover: string;

    constructor(name: string, artist: string, url: string, cover: string) {
        this.name = name;
        this.artist = artist;
        this.url = url;
        this.cover = cover;
    }

    onCardLeftScreen(direction: string) {
        console.log(this.name + " left the screen to the " + direction);
    }
}

function TinderCardComponent() {
    const [musicList, setMusicList] = useState<MusicTitle[]>([]);

    useEffect(() => {
        const fetchMusicList = async () => {
            try {
                const response = await fetch("/api/recommandation", {
                    credentials: "include",
                });
                if (response.ok) {
                    const data = await response.json();
                    setMusicList(data.musicList);
                } else {
                    console.error("Failed to fetch music list");
                }
            } catch (error) {
                console.error("Error fetching music list:", error);
            }
        };

        fetchMusicList();

        // Add dummy music
        setMusicList([
            new MusicTitle(
                "360",
                "charli xcx",
                "https://open.spotify.com/track/1",
                "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Charli_XCX_-_Brat_%28album_cover%29.png/800px-Charli_XCX_-_Brat_%28album_cover%29.png"
            ),
            new MusicTitle(
                "Apple",
                "charli xcx",
                "https://open.spotify.com/track/1",
                "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Charli_XCX_-_Brat_%28album_cover%29.png/800px-Charli_XCX_-_Brat_%28album_cover%29.png"
            ),
            new MusicTitle(
                "Von Dutch",
                "charli xcx",
                "https://open.spotify.com/track/1",
                "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Charli_XCX_-_Brat_%28album_cover%29.png/800px-Charli_XCX_-_Brat_%28album_cover%29.png"
            ),
        ]);
    }, []);

    return (
        <div>
            <h1 className="bg-red-700">Music Recommendation</h1>
            <div className="flex flex-col items-center gap-8 py-8">
                {musicList.map((music) => (
                    <TinderCard
                        key={music.name}
                        preventSwipe={["up", "down"]}
                        flickOnSwipe={true}
                        onCardLeftScreen={music.onCardLeftScreen}
                    >
                        <div className="p-4 rounded-xl bg-gray-800 flex flex-col gap-2 select-none max-w-sm">
                            <img
                                draggable="false"
                                className="rounded"
                                src={music.cover}
                                alt={music.name}
                            />
                            <h2 className="text-center">
                                {music.name} - {music.artist}
                            </h2>
                        </div>
                    </TinderCard>
                ))}
            </div>
        </div>
    );
}

export default TinderCardComponent;
