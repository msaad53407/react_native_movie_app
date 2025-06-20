import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import TrendingCard from '@/components/TrendingCard';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import useFetch from '@/hooks/useFetch';
import { fetchMovies } from '@/services/api';
import { getTrendingMovies } from '@/services/appwrite';
import { useRouter } from 'expo-router';
import { XIcon } from 'lucide-react-native';
import React from 'react';
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Homepage = () => {
  const router = useRouter();

  const {
    data: trendingMovies,
    loading: trendingMoviesLoading,
    error: trendingMoviesError,
  } = useFetch(() => getTrendingMovies());

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: '' }));

  return (
    <SafeAreaView className='flex-1 bg-primary'>
      <Image source={images.bg} className='absolute w-full z-0' resizeMode='cover' />
      <ScrollView
        className='flex-1 px-5 min-h-full'
        >
        <Image source={icons.logo} className='w-12 h-10 mt-20 mb-5 mx-auto' />
        {trendingMoviesLoading || moviesLoading ? (
          <ActivityIndicator size='large' color='0000ff' className='mt-10 self-center' />
        ) : trendingMoviesError || moviesError ? (
          <Text className='text-red-500'>Some Error Occured</Text>
        ) : !movies || movies.length === 0 ? (
          <View className='min-h-[70%] flex-col w-full justify-center items-center'>
            <XIcon color='white' size={50} />
            <Text className='text-xl text-white'>No Movies Found</Text>
          </View>
        ) : (
          <View className='flex-1 mt-5'>
            <SearchBar onPress={() => router.push('/search')} />
            {trendingMovies && (
              <View className='mt-10'>
                <Text className='text-lg text-white font-bold mb-3'>Trending Movies</Text>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  className='mb-4 mt-3'
                  data={trendingMovies}
                  contentContainerStyle={{
                    gap: 26,
                  }}
                  renderItem={({ item, index }) => <TrendingCard movie={item} index={index} />}
                  keyExtractor={(item, indx) => item.movie_id.toString() + indx.toString()}
                  ItemSeparatorComponent={() => <View className='w-4' />}
                />
              </View>
            )}
            <>
              <Text className='text-lg text-white font-bold mt-5 mb-3'>Latest Movies</Text>
              <FlatList
                data={movies}
                renderItem={({ item: movie }) => <MovieCard key={movie.id} {...movie} />}
                keyExtractor={item => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: 'flex-start',
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                className='mt-2 pb-32'
                scrollEnabled={false}
              />
            </>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Homepage;
