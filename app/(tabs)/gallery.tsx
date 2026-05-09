import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, FlatList, View, TouchableOpacity, Dimensions } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { Image } from 'expo-image';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';

const { width } = Dimensions.get('window');
const COLUMN_COUNT = 3;
const ITEM_SIZE = width / COLUMN_COUNT;

export default function GalleryScreen() {
  const [assets, setAssets] = useState<MediaLibrary.Asset[]>([]);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  const loadPhotos = useCallback(async () => {
    if (permissionResponse?.granted) {
      const { assets: fetchedAssets } = await MediaLibrary.getAssetsAsync({
        first: 50,
        mediaType: 'photo',
        sortBy: ['creationTime'],
      });
      setAssets(fetchedAssets);
    }
  }, [permissionResponse]);

  useEffect(() => {
    loadPhotos();
  }, [loadPhotos]);

  if (!permissionResponse) {
    // Aún cargando el estado del permiso
    return <ThemedView style={styles.container} />;
  }

  if (!permissionResponse.granted) {
    return (
      <ThemedView style={styles.centerContainer}>
        <IconSymbol size={100} name="photo.fill" color="#ccc" style={{ marginBottom: 20 }} />
        <ThemedText style={styles.message}>
          Necesitamos tu permiso para mostrar la galería y que puedas ver tus fotos.
        </ThemedText>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <ThemedText style={styles.permissionButtonText}>Conceder permiso a la galería</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    );
  }

  const renderItem = ({ item }: { item: MediaLibrary.Asset }) => (
    <Image
      source={{ uri: item.uri }}
      style={styles.image}
      contentFit="cover"
      transition={200}
    />
  );

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title">Tu Galería</ThemedText>
      </View>
      <FlatList
        data={assets}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={COLUMN_COUNT}
        contentContainerStyle={styles.list}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  message: {
    textAlign: 'center',
    marginBottom: 20,
  },
  permissionButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  list: {
    paddingHorizontal: 2,
  },
  image: {
    width: ITEM_SIZE - 4,
    height: ITEM_SIZE - 4,
    margin: 2,
    borderRadius: 4,
  },
});
