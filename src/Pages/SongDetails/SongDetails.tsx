import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetSongLyricsQuery, useLazyGetSongByIdQuery } from "../../store/API/songDetailsApi";
import { Container } from "../../components/Ui/container/Container.style";
import { Header } from "../../components/Ui/Header/Header";
import { NavBar } from "../../components/Ui/nav/NavBar";
import { StyledSongDetails } from "./SongDetails.style";
import { Heading } from "../../components/TypoGraphy/Heading";
import { SongLyrics } from "../../components/TypoGraphy/SongLyrics";

export const SongDetails = () => {
  const { songId } = useParams();
  const [fetchTriger, { data }] = useLazyGetSongByIdQuery();
  const {data: songLyricsData} = useGetSongLyricsQuery(songId);

  const lyricsData = songLyricsData?.lyrics;
  console.log(lyricsData?.lyrics.body.plain)

  const dataSong = data?.song;
  console.log(dataSong);

  useEffect(() => {
    if (songId) {
      fetchTriger(songId);
    }
  }, [songId]);

  return (
    <Container>
      <Header />
      <NavBar />
      <StyledSongDetails>
        <div className="songInfo">
          <img
            className="songImg"
            src={dataSong?.custom_song_art_image_url}
            alt="Song image"
          />
          <Heading headingText={dataSong?.title} headingType="h2" />
          <Heading headingText={dataSong?.artist_names} headingType="h3" />
          <Heading headingText='Produced by' headingType="h4" />
          <p>{dataSong?.producer_artists[0].name} &</p>
          <p>{dataSong?.producer_artists[1].name}</p>
        </div>
        <div className="songViews">
          <p>{dataSong?.release_date_with_abbreviated_month_for_display}</p>
          <p>
            {dataSong?.stats.pageviews > 1000000
              ? (dataSong?.stats.pageviews / 1000000)
                .toFixed(1)
                .replace(/\.0+$/, "") + "M"
              : (dataSong?.stats.pageviews / 100000)
                .toFixed(1)
                .replace(/\.0+$/, "") + "k"}
          </p>
        </div>
        <div className="lyrics">
          <SongLyrics lyricsHTML={lyricsData?.lyrics.body.html} />
          {/* <p dangerouslySetInnerHTML={{ __html: lyricsData?.lyrics.body.html }}>{lyricsData?.lyrics.body.html}</p> */}
        </div>
      </StyledSongDetails>
    </Container>
  );
};
