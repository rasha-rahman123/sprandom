import React, {
  createRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { NextPage } from "next";
import Layout from "../components/Layout";
import { Box, Text } from "rebass";
import axios from "axios";
import { Dropdown } from "../components/Dropdown";
import TinderCard from "react-tinder-card";
import { Slider } from "../components/Slider";
import { SiSpotify } from "react-icons/si";
import { BsPause, BsPlay } from "react-icons/bs";
import initFirebase from "../services/firebase";
import firebase from "firebase/app";
import "firebase/firestore";
import Router from 'next/router'
import { authContext } from "../services/auth";
interface findProps {}

export const find: NextPage<findProps> = ({}) => {
  const spotify = {
    clientID: process.env.NEXT_PUBLIC_SPOTIFY_PUBLIC_API_KEY,
    clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_SECRET_KEY,
  };

  const user = useContext(authContext);


  const saveTrack = async (i) => {
    await initFirebase();
    const db = firebase.firestore();
    const collection = db.collection("saves");
    const doc = collection.doc();
    doc
      .set({
        authorID: user.userID,
        title: tracks[i].track_names,
        art: tracks[i].track_art,
        artist: tracks[i].track_artists,
        external: tracks[i].track_preview,
      })
      .then(
        (res) => console.log(res),
        (rej) => console.log(rej)
      );
  };

  const date = [
    { val: 1, id: "A" },
    { val: 2, id: "B" },
    { val: 3, id: "C" },
  ];

  const [page, setPage] = useState(0);

  function prevPage() {
    if (page > 0) {
      setPage((p) => p - 1);
    }
  }

  function nextPage() {
    if (page < 5) {
      setPage((p) => p + 1);
    }
  }

  useEffect(() => {
    deckFinished && Router.push('/');
  });

  const [deckFinished, setDeckFinished] = useState<boolean>();

  const [token, setToken] = useState([]);
  const [genre, setGenre] = useState({
    selectedGenre: [],
    listOfGenresFromAPI: [],
  });
  const [tracks, setTracks] = useState([
    {
      track_names: "",
      track_artists: "",
      track_art: "",
      track_preview: "",
      track_p_url: "",
    },
    {
      track_names: "",
      track_artists: "",
      track_art: "",
      track_preview: "",
      track_p_url: "",
    },
    {
      track_names: "",
      track_artists: "",
      track_art: "",
      track_preview: "",
      track_p_url: "",
    },
    {
      track_names: "",
      track_artists: "",
      track_art: "",
      track_preview: "",
      track_p_url: "",
    },
  ]);
  //
  const submit = (e) => {
    e.preventDefault();

    if (genre.selectedGenre.length < 1) {
      return alert("You must at least add one genre!");
    }
    axios(
      `https://api.spotify.com/v1/recommendations?limit=4&market=US&seed_genres=${genre.selectedGenre.join(
        "%2C"
      )}
          &target_acousticness=${acousticSlider / 100}
          &target_danceability=${danceabilitySlider / 100}
          &target_energy=${energySlider / 100}
          &target_instrumentalness=${instrumentalSlider / 100}
          &target_liveness=${livenessSlider / 100}
          &target_loudness=${loudnessSlider / 100}
          &target_tempo=${tempoSlider / 100}
          &target_valence=${valenceSlider / 100}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )
      .then(async (submissionRes) => {
        // console.log(submissionRes);

        const trackOne = await submissionRes.data.tracks[0];
        const trackTwo = await submissionRes.data.tracks[1];
        const trackThree = await submissionRes.data.tracks[2];
        const trackFour = await submissionRes.data.tracks[3];
        const form = [
          submissionRes.data.tracks[0],
          submissionRes.data.tracks[1],
          submissionRes.data.tracks[2],
          submissionRes.data.tracks[3],
        ];
        await setTracks([
          {
            track_names: trackOne.name,
            track_artists: trackOne.artists[0].name,
            track_art: trackOne.album.images[0].url,
            track_preview: trackOne.external_urls.spotify,
            track_p_url: trackOne.preview_url,
          },
          {
            track_names: trackTwo.name,
            track_artists: trackTwo.artists[0].name,
            track_art: trackTwo.album.images[0].url,
            track_preview: trackTwo.external_urls.spotify,
            track_p_url: trackTwo.preview_url,
          },
          {
            track_names: trackThree.name,
            track_artists: trackThree.artists[0].name,
            track_art: trackThree.album.images[0].url,
            track_preview: trackThree.external_urls.spotify,
            track_p_url: trackThree.preview_url,
          },
          {
            track_names: trackFour.name,
            track_artists: trackFour.artists[0].name,
            track_art: trackFour.album.images[0].url,
            track_preview: trackFour.external_urls.spotify,
            track_p_url: trackFour.preview_url,
          },
        ]);
        const local = (i) => {
          localStorage.setItem(`${i}::track name`, form[i].name);
          localStorage.setItem(`${i}::track art`, form[i].album.images[0].url);
          localStorage.setItem(
            `${i}::track external`,
            form[i].external_urls.spotify
          );
          localStorage.setItem(`${i}::track artist`, form[i].artists[0].name);
        };
        tracks.map((x, i) => {
          if (typeof localStorage.getItem(`${i}::track name`) !== "undefined") {
            localStorage.setItem(
              `${i}::track name::2`,
              localStorage.getItem(`${i}::track name`)
            );
            localStorage.setItem(
              `${i}::track art::2`,
              localStorage.getItem(`${i}::track art`)
            );
            localStorage.setItem(
              `${i}::track external::2`,
              localStorage.getItem(`${i}::track external`)
            );
            localStorage.setItem(
              `${i}::track artist::2`,
              localStorage.getItem(`${i}::track artist`)
            );
            local(i);
          }
        });
        setSubmitted(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    document.onresize = resizeCheck;
  });

  const [mobile, setMobile] = useState();

  const resizeCheck = (e) => {
    e = e || window.event;
  };

  useEffect(() => {
    axios("https://accounts.spotify.com/api/token", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " + btoa(spotify.clientID + ":" + spotify.clientSecret),
      },
      data: "grant_type=client_credentials",
      method: "POST",
    }).then((tokenResponse) => {
      setToken(tokenResponse.data.access_token);

      axios(
        "https://api.spotify.com/v1/recommendations/available-genre-seeds",
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + tokenResponse.data.access_token,
          },
        }
      ).then((genreRes) => {
        setGenre({
          selectedGenre: genre.selectedGenre,
          listOfGenresFromAPI: genreRes.data.genres,
        });
      });
    });
  }, [genre.selectedGenre, spotify.clientID, spotify.clientSecret]);

  const genreChanged = (val) => {
    let j = [...genre.selectedGenre];
    j.push(genre.listOfGenresFromAPI[val]);
    setGenre({
      selectedGenre: j,
      listOfGenresFromAPI: genre.listOfGenresFromAPI,
    });
  };

  const genreRemoved = (val) => {
    let j = [...genre.selectedGenre];
    let k = j.indexOf(genre.listOfGenresFromAPI[val]);
    j.splice(k, 1);
    setGenre({
      selectedGenre: j,
      listOfGenresFromAPI: genre.listOfGenresFromAPI,
    });
  };

  async function randomize() {
    function action() {
      setAcousticSlider(Math.floor(Math.random() * 100));
      setDanceabilitySlider(Math.floor(Math.random() * 100));
      setEnergySlider(Math.floor(Math.random() * 100));
      setInstrumentalSlider(Math.floor(Math.random() * 100));
      setLivenessSlider(Math.floor(Math.random() * 100));
      setLoudnessSlider(Math.floor(Math.random() * 60) - 60);
      setPopularitySlider(Math.floor(Math.random() * 5000));
      setTempoSlider(Math.floor(Math.random() * 20000));
      setValenceSlider(Math.floor(Math.random() * 100));
    }

    for (let a = 0; a < 10; a++) {
      setTimeout(await action, 100);
    }
    let i = 0;
    let k = new Array();
    let j = [...genre.listOfGenresFromAPI];
    while (i < 3) {
      var index = Math.floor(Math.random() * j.length - 1);
      k.push(j[index]);
      j.splice(index, 1);
      i++;
    }
    setGenre({
      selectedGenre: k,
      listOfGenresFromAPI: genre.listOfGenresFromAPI,
    });
  }

  const [acousticSlider, setAcousticSlider] = useState(50);
  const [danceabilitySlider, setDanceabilitySlider] = useState(50);
  const [energySlider, setEnergySlider] = useState(50);
  const [instrumentalSlider, setInstrumentalSlider] = useState(35);
  const [livenessSlider, setLivenessSlider] = useState(0);
  const [loudnessSlider, setLoudnessSlider] = useState(0);
  const [popularitySlider, setPopularitySlider] = useState(5000);
  const [tempoSlider, setTempoSlider] = useState(10000);
  const [valenceSlider, setValenceSlider] = useState(50);

  const [submitted, setSubmitted] = useState(false);

  const sliders = [
    {
      sn: "acousticSlider",
      name: acousticSlider,
      f: setAcousticSlider,
      min: 0,
      max: 1,
    },
    {
      sn: "danceabilitySlider",
      name: danceabilitySlider,
      f: setDanceabilitySlider,
      min: 0,
      max: 1,
    },
    {
      sn: "energySlider",
      name: energySlider,
      f: setEnergySlider,
      min: 0,
      max: 1,
    },
    {
      sn: "instrumentalSlider",
      name: instrumentalSlider,
      f: setInstrumentalSlider,
      min: 0,
      max: 1,
    },
    {
      sn: "livenessSlider",
      name: livenessSlider,
      f: setLivenessSlider,
      min: 0,
      max: 1,
    },
    {
      sn: "loudnessSlider",
      name: loudnessSlider,
      f: setLoudnessSlider,
      min: -60,
      max: 0,
    },
    {
      sn: "tempoSlider",
      name: tempoSlider,
      f: setTempoSlider,
      min: 60,
      max: 200,
    },
    {
      sn: "valenceSlider",
      name: valenceSlider,
      f: setValenceSlider,
      min: 0,
      max: 1,
    },
  ];

  const itemEls = useRef(new Array());

  const [isPlaying, setIsPlaying] = useState<boolean>();

  function pause(cRef) {
    setIsPlaying(false);
    cRef.pause();
  }

  function play(cRef) {
    setIsPlaying(true);
    cRef.play();
  }
  return (
    <Layout>
      <Box
        as="form"
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          margin: "auto 0",
          position: "relative",
        }}
        onSubmit={(e) => {
          submit(e);
        }}
      >
        <Box
          sx={{
            textAlign: "left",
            alignSelf: "flex-start",
            mx: 30,
            my: "auto",
          }}
        >
          <Text
            sx={{
              fontSize: 36,
              color: "yellowText",

              fontWeight: 700,
            }}
          >
            Find Music
          </Text>
        </Box>
        {submitted ? (
          tracks.length > 0 && (
            <>
              <Text
                color={"whitesmoke"}
                alignSelf="flex-start"
                m={30}
                fontSize={32}
                sx={{ borderBottom: "6px solid whitesmoke" }}
              >
                This is what we recommend
              </Text>
              <Text
                color={"whitesmoke"}
                alignSelf="flex-start"
                mx={30}
                my={-10}
                fontSize={18}
                opacity={0.6}
              >
                Tap to listen to a preview (if available), Swipe left
                to skip, {user.userID ? 'swipe right to save to your likes' : 'be aware, swipe right will not save to your likes since you are not logged in.'}
              </Text>
              <Box
                sx={{
                  position: "relative",

                  height: "100%",
                  color: "whitesmoke",
                }}
              >
                {tracks.map((tracks, i) => (
                  <TinderCard
                    key={i}
                    onSwipe={(dir) => {
                      i === 0 && setDeckFinished(true);
                      dir === "right" && saveTrack(i);
                      pause(itemEls.current[i]);
                    }}
                  >
                    <Box
                      sx={{
                        borderRadius: 20,
                        width: 200,
                        padding: 3,
                        margin: "0 auto",
                        position: "absolute",
                        left: '50%',
                        backgroundSize: 'cover',
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Box
                        sx={{
                          width: "90%",
                          padding: 1,
                          borderRadius: 10,
                          bg: "yellowText",
                          color: "text",
                          alignSelf: "center",
                          position: 'relative',
                          left: '-50%',
                          my: 2,
                          height: "4rem",
                          boxShadow:
                            "0px 0px 3px #181B1A,0px 0px 10px #181B1A20",
                        }}
                      >
                        <h3 style={{ opacity: 0.8, display: "inline" }}>
                          {tracks.track_artists} -{" "}
                        </h3>{" "}
                        <h3 style={{ display: "inline" }}>
                          {tracks.track_names}
                        </h3>
                      </Box>
                      <Box
                        sx={{
                          backgroundImage: "url(" + tracks.track_art + ")",
                          width: "90%",
                          height: "calc(400px * .9)",
                          alignSelf: "center",
                          borderRadius: 20,
                          position: 'relative',
                          left: '-50%',
                          boxShadow:
                            "0px 0px 3px #181B1A,0px 0px 10px #181B1A20",
                        }}
                        className="card"
                      >
                        <audio
                          ref={(element) => itemEls.current.push(element)}
                          src={tracks.track_p_url}
                        />
                        <Box
                          sx={{
                            position: "absolute",
                            bottom: 10,
                            left: 10,
                            display: "flex",
                            fontSize: 48,
                          }}
                        >
                          <Box
                            sx={{
                              color: "yellowText",
                              bg: "text",
                              borderRadius: 10,
                              mx: 2,
                              p: 1,
                              boxShadow:
                                "0px 0px 3px #181B1A,0px 0px 10px #181B1A20",
                              ":hover": {
                                color: "#8bff9590",
                              },
                            }}
                          >
                            <Box as="a" href={tracks.track_preview}>
                              {" "}
                              <SiSpotify />
                            </Box>
                          </Box>
                          {tracks.track_p_url && (
                            <Box
                              sx={{
                                color: isPlaying ? "background" : "yellowText",
                                bg: "text",
                                borderRadius: 10,
                                mx: 2,
                                p: 1,
                                boxShadow:
                                  "0px 0px 3px #181B1A,0px 0px 10px #181B1A20",
                                ":hover": {
                                  color: "#8bff9590",
                                },
                              }}
                              onClick={() =>
                                isPlaying
                                  ? pause(itemEls.current[i])
                                  : play(itemEls.current[i])
                              }
                            >
                              {isPlaying ? <BsPause /> : <BsPlay />}
                            </Box>
                          )}
                        </Box>
                      </Box>
                    </Box>
                  </TinderCard>
                ))}
              </Box>
            </>
          )
        ) : (
          <>
            <Dropdown
              options={genre.listOfGenresFromAPI}
              genre={genre}
              setGenre={setGenre}
              changed={genreChanged}
              removed={genreRemoved}
              page={page}
              setPage={setPage}
              nextPage={nextPage}
              prevPage={prevPage}
            />

            <Box
              sx={{
                textAlign: "left",
                alignSelf: "flex-start",
                mx: 30,
                my: "auto",
              }}
            >
              <Text sx={{ fontSize: 28, color: "orangeText", fontWeight: 400 }}>
                Attribute Selector
              </Text>
            </Box>
            <Box
              sx={{
                display: "grid",
                width: "93.5%",
                gridTemplateColumns: ["50% 50%", "50% 50%", "25% 25% 25% 25%"],
                columnGap: 10,
                rowGap: 15,
                position: "relative",
              }}
            >
              {sliders &&
                sliders.map((x, i) => (
                  <Slider
                    key={i}
                    min={x.min}
                    max={x.max * 100}
                    value={x.name}
                    change={x.f}
                    x={x}
                    i={i}
                    tempoSlider={tempoSlider}
                  />
                ))}
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                alignSelf: "flex-end",
              }}
            >
              <Box
                p={"8px"}
                sx={{
                  borderRadius: 5,
                  bg: "yellowText",
                  color: "black",
                  m: 4,
                  fontWeight: 600,
                  cursor: "pointer",
                  ":hover": {
                    background: "#c1ffb1",
                  },
                }}
                onClick={() => randomize()}
              >
                Randomize
              </Box>

              <Box
                p={"8px"}
                onClick={(e) => submit(e)}
                sx={{
                  borderRadius: 5,
                  bg: "orangeText",
                  color: "black",
                  m: 4,
                  fontWeight: 600,
                  cursor: "pointer",
                  ":hover": {
                    background: "#c1ffb1",
                  },
                }}
                type="submit"
              >
                Generate Songs
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Layout>
  );
};

export default find;
