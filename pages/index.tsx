import React, { useContext, useEffect, useState } from "react";
import { NextPage } from "next";
import Layout from "../components/Layout";
import { Box, Image, Text } from "rebass";
import { BsFillPersonFill, BsMusicNoteList, BsSearch } from "react-icons/bs";
import { Input } from "@rebass/forms";
import { SiSpotify } from "react-icons/si";
import { authContext, useProvideAuth } from "../services/auth";
import SignOutModule from "../components/SignOutModule";
import Router from "next/router";
import firebase from "firebase/app";
import "firebase/firestore";
import initFirebase from "../services/firebase";
interface indexProps {}

export const Home: NextPage<indexProps> = ({}) => {
  const [j, setJ] = useState<any[]>([]);
  const [searchVal, setSearchVal] = useState<String>();
  const auth = useProvideAuth();
  const [k, setK] = useState<any[]>([]);
  const [saves, setSaves] = useState();
  const d = useContext(authContext);
  useEffect(() => {
      // @ts-ignore
    searchVal > 0 && setPage(1);
  }, [searchVal]);
  const signOut = () => {
    auth
      .signout()
      .then(() => {})
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    const p = [];
    const e = [];
    [0, 1, 2, 3].map((x, i) => {
      p.push({
        art: localStorage.getItem(`${i}::track art`),
        name: localStorage.getItem(`${i}::track name`),
        external: localStorage.getItem(`${i}::track external`),
        artist: localStorage.getItem(`${i}::track artist`),
      });
    });
    [0, 1, 2, 3].map((x, i) => {
      e.push({
        art: localStorage.getItem(`${i}::track art::2`),
        name: localStorage.getItem(`${i}::track name::2`),
        external: localStorage.getItem(`${i}::track external::2`),
        artist: localStorage.getItem(`${i}::track artist::2`),
      });
    });
    setJ(p);
    setK(e);
  }, []);

  useEffect(() => {
    const db = firebase.firestore();
    const collection = db.collection("saves");
    const k = d.userID;
    d.userID &&
      collection
        .limit(10)
        .where("authorID", "==", k)
        .onSnapshot(
          (querySnapshot) => {
            const newEntities = [];
            querySnapshot.forEach((doc) => {
              const entity = doc.data();
              entity.id = doc.id;
              newEntities.push(entity);

            });
            // @ts-ignore
            setSaves(newEntities);
          },
          (error) => {
            (error);
          }
        );
  }, [d]);
// @ts-ignore
  const filteredSaves = saves &&( !searchVal ? saves : saves.filter(save => {
    return  save.artist.indexOf(searchVal) !== -1
  }));
  const [page, setPage] = useState<number>(1);
  return (
    <Layout>
      {d.userID ? (
        <Box
          display="grid"
          sx={{
            gridTemplateRows: "10% 60% 30%",
            width: "100%",
            height: "100%",
        
          }}
        >
          <Box
            sx={{
              width: "calc(75vw-68px)",
              height: "100%",
              p: 2,
              borderRadius: 20,
              display: "grid",
              gridTemplateColumns: "75% 25%",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "100%",
                borderRadius: 10,
                bg: "black",
                display: "grid",
                gridTemplateColumns: "5% 95%",
                px: 4,
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <Box>
                <Text sx={{ color: "yellowText" }}>
                  <BsSearch />
                </Text>
              </Box>
              <Box>
                <Input
                  color="orangeText"
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  placeholder="Search Saved Songs By Artist"
                />
              </Box>
            </Box>
            <Box
              sx={{
                fontSize: 28,
                textAlign: "right",

                alignItems: "center",
                pr: 10,
              }}
            >
              {d.userID && (
                <Box
                  onClick={() => signOut()}
                  sx={{
                    display: "inline",
                    mx: 1,
                    color: "yellowText",
                    cursor: "pointer",
                  }}
                >
                  <Box>Sign Out</Box>
                </Box>
              )}
            </Box>
          </Box>
          <Box
            sx={{
              width: "calc(75vw-68px)",
              height: "100%",
              p: 3,
              borderRadius: 20,
            }}
          >
            <Box sx={{ width: "100%", mb: 2 }}>
              <Text sx={{ color: "yellowText", fontSize: 28 }}>
                Your Recent Finds
              </Text>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: ["space-around","space-around","space-between"],
              }}
            >
              <Box
                sx={{
                  width: "35%",
                  height: "35%",
                  borderRadius: 20,
                  textAlign: "center",
                  display: "grid",
                  gridTemplateColumns: "50% 50%",
                  gridTemplateRows: "50% 50%",
                  color: "white",
                  boxShadow: "0px 0px 3px #181B1A,0px 0px 10px #181B1A20",
                }}
              >
                {j.map((x, i) => (
                  <Box
                    as="a"
                    href={x.external}
                    sx={{
                      backgroundImage: `url(${x.art})`,
                      width: "100%",
                      height: 140,
                      backgroundSize: "cover",
                      transition: "all 300ms ease",
                      ":hover": {
                        transform: "scale(1.1)",
                        cursor: "pointer",
                        borderRadius: 5,
                      },
                    }}
                  ></Box>
                ))}
              </Box>
              <Box
                sx={{
                  width: "35%",
                  height: "35%",
                  borderRadius: 20,
                  textAlign: "center",
                  display: "grid",
                  gridTemplateColumns: "50% 50%",
                  gridTemplateRows: "50% 50%",
                  color: "white",
                }}
              >
                {k.map((x, i) => (
                  <Box
                    as="a"
                    href={x.external}
                    sx={{
                      backgroundImage: `url(${x.art})`,
                      width: "100%",
                      height: 140,
                      backgroundSize: "cover",
                      transition: "all 300ms ease",
                      ":hover": {
                        transform: "scale(1.1)",
                        cursor: "pointer",
                        borderRadius: 5,
                      },
                    }}
                  ></Box>
                ))}
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              width: "calc(75vw-68px)",
              height: "100%",

              p: 1,
              borderRadius: 20,
            }}
          >
            {saves && 
            // @ts-ignore
            saves.slice(page * 4 - 4, page * 4).length > 0 && (
              <Box sx={{ width: "100%", mt: -5 }}>
                <Text sx={{ color: "yellowText", fontSize: 28, mb: 2 }}>
                  Your Liked Finds
                </Text>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: ["50% 50%","33% 33% 33%","20% 20% 20% 20% 20%"],
                    flexDirection: "row",
                  }}
                >
                  {saves &&
                  // @ts-ignore
                    saves.slice(page * 4 - 4, page * 4).length > 0 &&
                    // @ts-ignore
                    filteredSaves.reverse().slice(page * 4 - 4, page * 4).map((x, i) => (
                      <Box
                        as="a"
                        href={x.external}
                        sx={{
                          bg: "",
                          borderRadius: 20,
                          backgroundImage: `url(${x.art})`,
                          backgroundSize: "cover",
                          mx: 2,
                          width: 150,
                          height: 150,
                        }}
                      >
                        {/* <Text sx={{ bg: "#8fffc7", color: "text" }}>
                        {x.artist} - {x.title}
                      </Text> */}
                      </Box>
                    ))}
                  <Box
                    as="a"
                    sx={{
                      bg: "yellowText",
                      borderRadius: 20,
                      backgroundSize: "cover",
                      mx: 2,
                      width: 150,
                      height: 150,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {// @ts-ignore
                    saves.slice((page + 1) * 4 - 4, (page + 1) * 4).length >
                      0 && (
                      <Text
                        onClick={() => setPage(page + 1)}
                        sx={{
                          color: "text",
                          textAlign: "center",
                          cursor: "pointer",
                        }}
                      >
                        Load More
                      </Text>
                    )}
                    {page > 1 && (
                      <Text
                        onClick={() => setPage(page - 1)}
                        sx={{
                          color: "text",
                          textAlign: "center",
                          cursor: "pointer",
                        }}
                      >
                        Load Previous
                      </Text>
                    )}
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            fontSize: 64,
            fontWeight: 800,
            color: "yellowText",
            display: "flex",
            justifyContent: "space-around",
            textAlign: "center",
            alignItems: "center",
            alignSelf: "center",
            flexDirection: "column",
          }}
        >
          <Text color="lighterBg">You gotta join to use this.</Text>
          <Text
            as="a"
            href="/signup"
            color="orangeText"
            sx={{ borderBottom: "10px solid #9dffaa" }}
          >
            Click here to sign up.
          </Text>
          <Text as="a" href="/join" sx={{ borderBottom: "10px solid #9dffaa" }}>
            Click here to log in.
          </Text>
          <Text color="#9dd3ff" sx={{ fontStyle: "italic", mt: 6 }}>
            Trust me, you wanna save your{" "}
            <Text as="b" sx={{ textDecoration: "underline" }}>
              rare
            </Text>{" "}
            finds.
          </Text>
        </Box>
      )}
    </Layout>
  );
};

export default Home;
