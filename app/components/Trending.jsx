import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
  StyleSheet,
} from "react-native";
import * as Animatable from "react-native-animatable";
import React, { useState } from "react";
import { icons } from "@/constants";
import { Video, ResizeMode } from "expo-av";
import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";

const viewabilityConfig = {
  itemVisiblePercentThreshold: 70,
};
const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1.1,
  },
};

const zoomOut = {
  0: {
    scale: 1.1,
  },
  1: {
    scale: 0.9,
  },
};

const TrendingItem = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.play();
  });
  let videoSource = item.video;
  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem == item.id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        (console.log(videoSource),
        (
          <View className="w-52 h-72 rounded-[35px] mt-3 bg-white/10">
            <VideoView
              player={player}
              allowsFullscreen
              allowsPictureInPicture
            />
          </View>
        ))
      ) : (
        <TouchableOpacity
          className="relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};
const Trending = ({ posts }) => {
  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  const [activeItem, setActiveItem] = useState(posts[1]);
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={viewabilityConfig}
      horizontal
    />
  );
};

export default Trending;
