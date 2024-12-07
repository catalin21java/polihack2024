import { View, Text, FlatList, Image, RefreshControl } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import SearchInput from "../components/SearchInput";
import Trending from "../components/Trending";
import EmptyState from "../components/EmptyState";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import VideoCard from "../components/VideoCard";

const Home = () => {
  const [posts, setPosts] = useState<
    {
      id: string;
      creator: string;
      thumbnail: string;
      video: string;
      prompt: string;
      title: string;
    }[]
  >([]);

  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const getPosts = async () => {
    try {
      const q = query(collection(db, "videos"));
      const querySnapshot = await getDocs(q);
      const postsArray: {
        id: string;
        creator: string;
        thumbnail: string;
        video: string;
        prompt: string;
        title: string;
      }[] = [];
      querySnapshot.forEach((doc) => {
        postsArray.push({
          id: doc.id,
          creator: doc.get("creator"),
          thumbnail: doc.get("thumbnail"),
          video: doc.get("video"),
          prompt: doc.get("prompt"),
          title: doc.get("title"),
        });
      });
      setPosts(postsArray);
      setLoading(false);
    } catch (error) {
      console.log("Error getting documents: ", error);
      setLoading(false);
    }
  };

  const latestPosts = posts.slice(-3, -1);
  useEffect(() => {
    getPosts();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await getPosts();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#e0f7fa" }}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View
            style={{ marginTop: 24, marginHorizontal: 16, marginBottom: 24 }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 24,
              }}
            >
              <View>
                <Text style={{ fontSize: 14, color: "#607d8b" }}>
                  Welcome Back
                </Text>
                <Text
                  style={{ fontSize: 24, fontWeight: "600", color: "#37474f" }}
                >
                  Filip
                </Text>
              </View>
              <View style={{ marginTop: 6 }}>
                <Image
                  source={images.logoSmall}
                  style={{ width: 36, height: 40 }}
                  resizeMode="contain"
                />
              </View>
            </View>
            <SearchInput placeholder="Search for a video topic" />
            <View style={{ width: "100%", paddingTop: 20, paddingBottom: 32 }}>
              <Text
                style={{ fontSize: 18, color: "#37474f", marginBottom: 12 }}
              >
                Latest Videos
              </Text>
              <Trending posts={posts} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            subtitle="Be the first one to upload a video"
            //titleStyle={{ color: "#37474f" }} // Darker color for the "No videos found" title
            //subtitleStyle={{ color: "#607d8b" }} // Darker color for the subtitle
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
