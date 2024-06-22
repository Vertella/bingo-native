// src/screens/BingoCardScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { ImageBackground } from 'react-native';

const BingoCardScreen = () => {
  const [bingoText, setBingoText] = useState([]);
  const [markedCells, setMarkedCells] = useState([]);
  const [hasBingo, setHasBingo] = useState(false);

  useEffect(() => {
    fetch('https://api.jsonbin.io/v3/b/658b2557266cfc3fde6ea608')
      .then((response) => response.json())
      .then((data) => {
        let prompts = data.record.bingotext.prompts;
        prompts = shuffleArray(prompts);
        setBingoText(prompts.slice(0, 25));
      });
  }, []);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const toggleCell = (index) => {
    setMarkedCells((prev) => {
      const newMarkedCells = [...prev];
      newMarkedCells[index] = !newMarkedCells[index];
      if (index === 12) newMarkedCells[index] = true; // Ensure the free space remains marked
      checkForBingo(newMarkedCells);
      return newMarkedCells;
    });
  };

  const checkForBingo = (cells) => {
    const lines = [
      // Rows
      [0, 1, 2, 3, 4],
      [5, 6, 7, 8, 9],
      [10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19],
      [20, 21, 22, 23, 24],
      // Columns
      [0, 5, 10, 15, 20],
      [1, 6, 11, 16, 21],
      [2, 7, 12, 17, 22],
      [3, 8, 13, 18, 23],
      [4, 9, 14, 19, 24],
      // Diagonals
      [0, 6, 12, 18, 24],
      [4, 8, 12, 16, 20],
    ];

    const isBingo = lines.some((line) => line.every((index) => cells[index]));
    setHasBingo(isBingo);
};

  return (
    <ImageBackground source={require('../assets/bg1.jpg')} style={styles.background}>
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topbar}>
        <Text style={styles.title}>HOUSE BINGO</Text>
      </View>
      <View style={styles.bingoCard}>
        {bingoText.map((prompt, index) => (
          <Pressable
            key={index}
            style={[styles.bingoCell, markedCells[index] && styles.bingoCellMarked]}
            onPress={() => toggleCell(index)}
          >
            <Text style={styles.bingoText}>{index === 12 ? 'Free Space' : prompt}</Text>
          </Pressable>
        ))}
      </View>
      {hasBingo && <Text style={styles.bingoTextDisplay}>BINGO!</Text>}
    </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
      },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  topbar: {
    width: '100%',
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'lightskyblue',
    textShadowColor: 'darkblue',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  bingoCard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 10,
  },
  bingoCell: {
    width: '18%',
    aspectRatio: 1,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'lightskyblue',
  },
  bingoCellMarked: {
    backgroundColor: 'lightblue',
  },
  bingoText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'darkblue',
    textAlign: 'center',
  },
  bingoTextDisplay: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red',
  },
});

export default BingoCardScreen;
