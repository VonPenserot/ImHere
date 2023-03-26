import { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Alert,
} from "react-native";
import { Participant } from "../components/Participant";
import { styles } from "./style";

export function Home() {
  const [participants, setParticipants] = useState<string[]>([]);
  const [participantName, setParticipantName] = useState("");

  function handleParticipantAdd() {
    if (participantName === "") return;
    if (participants.includes(participantName)) {
      return Alert.alert(
        "Participante existe",
        "Já existe um participante na lista com este nome."
      );
    }


    setParticipants((prevParticipants) => [
      ...prevParticipants,
      participantName,
    ]);
    setParticipantName("");
  }

  function handleParticipantRemove(name: string) {
    Alert.alert("Remove", `Gostaria de remover ${name}?`, [
      { text: "Sim", onPress: () => Alert.alert("Deletado!") },
      { text: "Não", style: "cancel" },
    ]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Nome do evento</Text>

      <Text style={styles.eventDate}>Sexta, 4 de Novembro de 2022.</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6B6B6B"
          value={participantName}
          onChangeText={setParticipantName}
        />

        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={participants} // [] if empty it will show the ListEmptyComponent
        keyExtractor={(item) => item}
        renderItem={({ item, index }) => (
          <Participant
            key={index}
            name={item}
            onRemove={() => handleParticipantRemove(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.listEmptyText}>
            Ninguém chegou no evento ainda? Adicione participantes a sua lista
            de presença.
          </Text>
        }
      />

      {/* <ScrollView showsVerticalScrollIndicator={false}>
        {
          participants.map(participant => (
            <Participant 
              key={participant} 
              name={participant} 
              onRemove={() => handleParticipantRemove("Rodrigo")} 
            />
          ))
        }
      </ScrollView> */}
    </View>
  );
}
