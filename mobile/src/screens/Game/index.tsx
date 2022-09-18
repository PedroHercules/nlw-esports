import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { FlatList, Image, TouchableOpacity, View, Text } from 'react-native';

import logoImg from '../../assets/logo-nlw-esports.png';

import { styles } from './styles';

import { THEME } from '../../theme';

import { Background } from '../../components/Background';
import { GameParams } from '../../@types/navigation';
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';



export function Game() {
  const [duos, setDuos] = useState<DuoCardProps[]>([]);
  const navigation = useNavigation();

  const route = useRoute();
  const game = route.params as GameParams;

  
  function handleGoBack() {
    navigation.goBack();
  }

  useEffect(() => {
    fetch(`https://5972-45-179-115-240.sa.ngrok.io/games/${game.id}/ads`)
    .then(response => response.json())
    .then(data => setDuos(data));
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo 
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image 
            source={logoImg}
            style={styles.logo}
          />

          <View style={styles.right}/>
        </View>

        <Image 
          source={{ uri: game.banner }}
          style={styles.cover}
          resizeMode="cover"
        />

        <Heading 
          title={game.title}
          subtitle='Conecte-se e comece a jogar'
        />

        <FlatList 
          data={duos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <DuoCard 
              data={item}
              onConnect={() => {}}
            />
          )}
          horizontal
          style={styles.containerList}
          contentContainerStyle={duos.length > 0 ? styles.contentList : styles.emptyContentList}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Não há anúncios publicados ainda.
            </Text>
          )}
        />
      </SafeAreaView>
    </Background>
  );
}