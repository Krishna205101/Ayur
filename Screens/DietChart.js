import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, PanResponder, Animated, TouchableOpacity, ImageBackground } from 'react-native';
import * as Sqlite from 'expo-sqlite';
import { useTheme } from '@react-navigation/native';
import * as Print from 'expo-print';
import { AntDesign } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import DatePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import * as Sharing from 'expo-sharing';
import AsyncStorage from '@react-native-async-storage/async-storage';

const db = Sqlite.openDatabase("ProjectAyur.db")

export default function DietChart({ navigation }) {

    const allData = {
        English: [
            [{ name: "Brinjal", color: "#B8B6B4" }, { name: "Banana-raw", color: "#B8B6B4" }, { name: "French Beans", color: "#B8B6B4" }, { name: "Capsicum", color: "#B8B6B4" }, { name: "Bitter Gourd", color: "#B8B6B4" }, { name: "Bottle Gourd", color: "#B8B6B4" }, { name: "Cabbage", color: "#B8B6B4" }, { name: "Cauliflower", color: "#B8B6B4" }, { name: "Cucumber", color: "#B8B6B4" }, { name: "Drum Stick", color: "#B8B6B4" }, { name: "Garlic", color: "#B8B6B4" }, { name: "Green Peas", color: "#B8B6B4" }, { name: "Ivy Gourd", color: "#B8B6B4" }, { name: "Lady Finger", color: "#B8B6B4" }, { name: "Mushroom", color: "#B8B6B4" }, { name: "Pumpkin", color: "#B8B6B4" }, { name: "Tamarind", color: "#B8B6B4" }, { name: "Broccoli", color: "#B8B6B4" }, { name: "Corn", color: "#B8B6B4" }, { name: "Tomato", color: "#B8B6B4" }, { name: "Peas", color: "#B8B6B4" }, { name: "Beans", color: "#B8B6B4" }],
            [{ name: "Spinach", color: "#B8B6B4" }, { name: "Green Sorrel", color: "#B8B6B4" }, { name: "Amaranithus", color: "#B8B6B4" }, { name: "Fenugreek Leaves", color: "#B8B6B4" }, { name: "Sorrel leaves", color: "#B8B6B4" }, { name: "Coriander Leaves", color: "#B8B6B4" }, { name: "Mint Leaves", color: "#B8B6B4" }, { name: "Curry Leaves", color: "#B8B6B4" }, { name: "Chinese Spinach", color: "#B8B6B4" }],
            [{ name: "Potato", color: "#B8B6B4" }, { name: "Taro Root", color: "#B8B6B4" }, { name: "Yarn", color: "#B8B6B4" }, { name: "Tapoika", color: "#B8B6B4" }, { name: "Carrot", color: "#B8B6B4" }, { name: "Radish", color: "#B8B6B4" }, { name: "Onion", color: "#B8B6B4" }, { name: "Ginger", color: "#B8B6B4" }, { name: "Sweet Potato", color: "#B8B6B4" }, { name: "Beet Root", color: "#B8B6B4" }],
            [{ name: "Barley", color: "#B8B6B4" }, { name: "Beans", color: "#B8B6B4" }, { name: "Bengalgram", color: "#B8B6B4" }, { name: "Maize", color: "#B8B6B4" }, { name: "Millet", color: "#B8B6B4" }, { name: "Paddy", color: "#B8B6B4" }, { name: "Pea", color: "#B8B6B4" }, { name: "Ragi", color: "#B8B6B4" }, { name: "Rice", color: "#B8B6B4" }, { name: "Sorghum", color: "#B8B6B4" }, { name: "Wheat", color: "#B8B6B4" }],
            [{ name: "Finger", color: "#B8B6B4" }, { name: "Foxtail", color: "#B8B6B4" }, { name: "Pearl", color: "#B8B6B4" }, { name: "Buckwheat ", color: "#B8B6B4" }, { name: "Amaranth ", color: "#B8B6B4" }, { name: "Little", color: "#B8B6B4" }, { name: "Barnyard", color: "#B8B6B4" }, { name: "Broomcorn", color: "#B8B6B4" }, { name: "Koda", color: "#B8B6B4" }],
            [{ name: "Alfalfa Green", color: "#B8B6B4" }, { name: "Broccoli", color: "#B8B6B4" }, { name: "Mung Bean", color: "#B8B6B4" }, { name: "Wheat", color: "#B8B6B4" }, { name: "Radish", color: "#B8B6B4" }, { name: "Soybean", color: "#B8B6B4" }, { name: "Mustard", color: "#B8B6B4" }, { name: "Green Lentil", color: "#B8B6B4" }, { name: "Onion", color: "#B8B6B4" }, { name: "Sunflower", color: "#B8B6B4" }, { name: "Pea", color: "#B8B6B4" }],
            [{ name: "Apple", color: "#B8B6B4" }, { name: "Banana", color: "#B8B6B4" }, { name: "Mango", color: "#B8B6B4" }, { name: "Grapes", color: "#B8B6B4" }, { name: "Pomogranate", color: "#B8B6B4" }, { name: "Water Melon", color: "#B8B6B4" }, { name: "Papaya", color: "#B8B6B4" }, { name: "Guava", color: "#B8B6B4" }, { name: "Orange", color: "#B8B6B4" }, { name: "Sweet Lemon", color: "#B8B6B4" }, { name: "Lemon", color: "#B8B6B4" }, { name: "Musk Melon", color: "#B8B6B4" }, { name: "Sapota", color: "#B8B6B4" }, { name: "Jack Fruit", color: "#B8B6B4" }, { name: "Pine Apple", color: "#B8B6B4" }],
            [{ name: "Chicken", color: "#B8B6B4" }, { name: "Fish", color: "#B8B6B4" }, { name: "Prawns", color: "#B8B6B4" }, { name: "Goat", color: "#B8B6B4" }, { name: "Beef", color: "#B8B6B4" }, { name: "Egg", color: "#B8B6B4" }, { name: "Crabs", color: "#B8B6B4" }, { name: "Dry Fish", color: "#B8B6B4" }, { name: "Other Sea foods", color: "#B8B6B4" }],
            [{ name: "Milk", color: "#B8B6B4" }, { name: "Curd", color: "#B8B6B4" }, { name: "ButterMilk", color: "#B8B6B4" }, { name: "Ghee", color: "#B8B6B4" }, { name: "Butter", color: "#B8B6B4" }, { name: "Paneer", color: "#B8B6B4" }, { name: "Cheese", color: "#B8B6B4" }, { name: "Ice Creams", color: "#B8B6B4" }],
            [{ name: "Extra-virgin olive oil", color: "#B8B6B4" }, { name: "Light olive oil", color: "#B8B6B4" }, { name: "Coconut oil", color: "#B8B6B4" }, { name: "Canola oil", color: "#B8B6B4" }, { name: "Avocado oil", color: "#B8B6B4" }, { name: "Peanut oil", color: "#B8B6B4" }, { name: "Sesame oil", color: "#B8B6B4" }, { name: "SunFlower oil", color: "#B8B6B4" }, { name: "Groundnut oil", color: "#B8B6B4" }, { name: "Mustard oil", color: "#B8B6B4" }],
            [{ name: "Sweet", color: "#B8B6B4" }, { name: "Sour", color: "#B8B6B4" }, { name: "Salt", color: "#B8B6B4" }, { name: "Bitter", color: "#B8B6B4" }, { name: "Astringent", color: "#B8B6B4" }, { name: "Spicy", color: "#B8B6B4" }],
            [{ name: "Dry Fruits", color: "#B8B6B4" }, { name: "Hot Bewerages", color: "#B8B6B4" }, { name: "Cold Bewerages", color: "#B8B6B4" }, { name: "Junk Food", color: "#B8B6B4" }, { name: "Alcohol", color: "#B8B6B4" }, { name: "Smoking Cigerattes", color: "#B8B6B4" }, { name: "Chewing Tobacco", color: "#B8B6B4" }, { name: "Vegetable Soup", color: "#B8B6B4" }, { name: "Bone Soup", color: "#B8B6B4" }, { name: "Coffee", color: "#B8B6B4" }, { name: "Tea", color: "#B8B6B4" }, { name: "Green Tea", color: "#B8B6B4" }]
        ],
        Telugu: [
            [{ name: "???????????????", color: "#B8B6B4" }, { name: "??????????????? ????????????", color: "#B8B6B4" }, { name: "????????????????????????????????????", color: "#B8B6B4" }, { name: "?????????????????????????????????", color: "#B8B6B4" }, { name: "?????????????????????", color: "#B8B6B4" }, { name: "????????????????????????", color: "#B8B6B4" }, { name: "????????????????????????", color: "#B8B6B4" }, { name: "??????????????????????????????", color: "#B8B6B4" }, { name: "??????????????????", color: "#B8B6B4" }, { name: "????????????", color: "#B8B6B4" }, { name: "??????????????????????????????", color: "#B8B6B4" }, { name: "???????????? ?????????????????????", color: "#B8B6B4" }, { name: "????????????", color: "#B8B6B4" }, { name: "???????????? ?????????", color: "#B8B6B4" }, { name: "?????????????????????????????????", color: "#B8B6B4" }, { name: "??????????????????????????????", color: "#B8B6B4" }, { name: "????????????????????????", color: "#B8B6B4" }, { name: "?????????????????????", color: "#B8B6B4" }, { name: "??????????????????????????????", color: "#B8B6B4" }, { name: "??????????????????", color: "#B8B6B4" }, { name: "?????????????????????", color: "#B8B6B4" }, { name: "??????????????????", color: "#B8B6B4" }],
            [{ name: "??????????????????", color: "#B8B6B4" }, { name: "??????????????? ?????????", color: "#B8B6B4" }, { name: "??????????????????", color: "#B8B6B4" }, { name: "??????????????? ???????????????", color: "#B8B6B4" }, { name: "??????????????????", color: "#B8B6B4" }, { name: "???????????????????????????", color: "#B8B6B4" }, { name: "??????????????????", color: "#B8B6B4" }, { name: "???????????????????????????", color: "#B8B6B4" }, { name: "???????????????????????????", color: "#B8B6B4" }],
            [{ name: "???????????????????????????", color: "#B8B6B4" }, { name: "???????????????????????????", color: "#B8B6B4" }, { name: "????????????", color: "#B8B6B4" }, { name: "?????????????????????????????? ", color: "#B8B6B4" }, { name: "??????????????????", color: "#B8B6B4" }, { name: "????????????????????????", color: "#B8B6B4" }, { name: "????????????????????????", color: "#B8B6B4" }, { name: "???????????????", color: "#B8B6B4" }, { name: "???????????????????????????", color: "#B8B6B4" }, { name: "???????????? ????????????", color: "#B8B6B4" }],
            [{ name: "??????????????????", color: "#B8B6B4" }, { name: "??????????????????", color: "#B8B6B4" }, { name: "??????????????????", color: "#B8B6B4" }, { name: "??????????????????????????????", color: "#B8B6B4" }, { name: "?????????????????????", color: "#B8B6B4" }, { name: "???????????????", color: "#B8B6B4" }, { name: "???????????????", color: "#B8B6B4" }, { name: "????????????", color: "#B8B6B4" }, { name: "??????????????????", color: "#B8B6B4" }, { name: "???????????????", color: "#B8B6B4" }],
            [{ name: "??????????????????", color: "#B8B6B4" }, { name: "????????????????????? ???????????????", color: "#B8B6B4" }, { name: "??????????????????", color: "#B8B6B4" }, { name: "????????????????????????", color: "#B8B6B4" }, { name: "?????????????????????", color: "#B8B6B4" }, { name: "???????????????", color: "#B8B6B4" }, { name: "????????????", color: "#B8B6B4" }, { name: "??????????????????", color: "#B8B6B4" }],
            [{ name: "???????????? ??????????????????", color: "#B8B6B4" }, { name: "????????????????????? ??????????????????", color: "#B8B6B4" }, { name: "???????????? ??????????????????", color: "#B8B6B4" }, { name: "??????????????? ??????????????????", color: "#B8B6B4" }, { name: "???????????????????????? ??????????????????", color: "#B8B6B4" }, { name: "????????????????????????", color: "#B8B6B4" }, { name: "???????????????", color: "#B8B6B4" }, { name: "?????????????????? ?????????????????????", color: "#B8B6B4" }, { name: "???????????????????????? ??????????????????", color: "#B8B6B4" }, { name: "?????????????????????????????????????????? ?????????????????? ??????????????????", color: "#B8B6B4" }, { name: "??????????????? ??????????????????", color: "#B8B6B4" }],
            [{ name: "???????????????", color: "#B8B6B4" }, { name: "????????????????????????", color: "#B8B6B4" }, { name: "??????????????????", color: "#B8B6B4" }, { name: "?????????????????????", color: "#B8B6B4" }, { name: "?????????????????????", color: "#B8B6B4" }, { name: "????????????????????????", color: "#B8B6B4" }, { name: "????????????????????????", color: "#B8B6B4" }, { name: "?????????", color: "#B8B6B4" }, { name: "??????????????????", color: "#B8B6B4" }, { name: "????????? ???????????????", color: "#B8B6B4" }, { name: "????????????????????????", color: "#B8B6B4" }, { name: "??????????????????", color: "#B8B6B4" }, { name: "???????????????", color: "#B8B6B4" }, { name: "????????? ????????????", color: "#B8B6B4" }, { name: "???????????? ????????????", color: "#B8B6B4" }],
            [{ name: "??????????????????", color: "#B8B6B4" }, { name: "?????????", color: "#B8B6B4" }, { name: "?????????????????????", color: "#B8B6B4" }, { name: "?????????", color: "#B8B6B4" }, { name: "?????????????????? ???????????????", color: "#B8B6B4" }, { name: "??????????????????", color: "#B8B6B4" }, { name: "???????????????", color: "#B8B6B4" }, { name: "???????????? ???????????????", color: "#B8B6B4" }, { name: "????????? ?????????????????? ?????????????????????", color: "#B8B6B4" }],
            [{ name: "????????????", color: "#B8B6B4" }, { name: "??????????????????", color: "#B8B6B4" }, { name: "??????????????????", color: "#B8B6B4" }, { name: "??????????????????", color: "#B8B6B4" }, { name: "???????????????", color: "#B8B6B4" }, { name: "???????????????", color: "#B8B6B4" }, { name: "????????????", color: "#B8B6B4" }, { name: "????????? ????????????????????????", color: "#B8B6B4" }],
            [{ name: "??????????????? ??????????????? ????????????", color: "#B8B6B4" }, { name: "??????????????? ????????????", color: "#B8B6B4" }, { name: "????????????????????? ????????????", color: "#B8B6B4" }, { name: "??????????????????", color: "#B8B6B4" }, { name: "????????????????????? ????????????", color: "#B8B6B4" }, { name: "???????????????????????? ????????????", color: "#B8B6B4" }, { name: "????????????????????? ????????????", color: "#B8B6B4" }, { name: "????????? ?????????????????? ???????????????", color: "#B8B6B4" }, { name: "???????????????????????? ????????????", color: "#B8B6B4" }, { name: "???????????? ????????????", color: "#B8B6B4" }],
            [{ name: "????????????", color: "#B8B6B4" }, { name: "??????????????????", color: "#B8B6B4" }, { name: "???????????????", color: "#B8B6B4" }, { name: "????????????", color: "#B8B6B4" }, { name: "????????????", color: "#B8B6B4" }, { name: "????????????", color: "#B8B6B4" }],
            [{ name: "???????????? ????????????????????????", color: "#B8B6B4" }, { name: "???????????? ????????????????????????", color: "#B8B6B4" }, { name: "???????????? ????????????????????????", color: "#B8B6B4" }, { name: "???????????? ?????????????????????", color: "#B8B6B4" }, { name: "???????????????", color: "#B8B6B4" }, { name: "?????????????????????", color: "#B8B6B4" }, { name: "?????????????????? ???????????????", color: "#B8B6B4" }, { name: "????????????????????? ????????????", color: "#B8B6B4" }, { name: "???????????? ????????????", color: "#B8B6B4" }, { name: "????????????", color: "#B8B6B4" }, { name: "??????", color: "#B8B6B4" }, { name: "?????????????????? ??????", color: "#B8B6B4" }]
        ],
        Hindi: [
            [{ name: "???????????????", color: "#B8B6B4" }, { name: "???????????????-????????????", color: "#B8B6B4" }, { name: "?????????????????? ???????????????", color: "#B8B6B4" }, { name: "??????????????? ???????????????", color: "#B8B6B4" }, { name: "???????????????", color: "#B8B6B4" }, { name: "????????????", color: "#B8B6B4" }, { name: "??????????????? ????????????", color: "#B8B6B4" }, { name: "????????????", color: "#B8B6B4" }, { name: "????????????", color: "#B8B6B4" }, { name: "??????????????????", color: "#B8B6B4" }, { name: "???????????????", color: "#B8B6B4" }, { name: "????????? ?????????", color: "#B8B6B4" }, { name: "?????????????????????", color: "#B8B6B4" }, { name: "??????????????????", color: "#B8B6B4" }, { name: "???????????????", color: "#B8B6B4" }, { name: "???????????????", color: "#B8B6B4" }, { name: "????????????", color: "#B8B6B4" }, { name: "????????????????????????", color: "#B8B6B4" }, { name: "???????????????", color: "#B8B6B4" }, { name: "???????????????", color: "#B8B6B4" }, { name: "?????????", color: "#B8B6B4" }, { name: "??????????????????", color: "#B8B6B4" }],
            [{ name: "????????????", color: "#B8B6B4" }, { name: "??????????????? ???????????????", color: "#B8B6B4" }, { name: "??????????????????", color: "#B8B6B4" }, { name: "??????????????? ????????????", color: "#B8B6B4" }, { name: "??????????????? ???????????????", color: "#B8B6B4" }, { name: "??????????????? ?????? ???????????????", color: "#B8B6B4" }, { name: "??????????????? ?????? ???????????????", color: "#B8B6B4" }, { name: "????????? ???????????????", color: "#B8B6B4" }, { name: "???????????? ????????????", color: "#B8B6B4" }],
            [{ name: "?????????", color: "#B8B6B4" }, { name: "????????????", color: "#B8B6B4" }, { name: "????????????", color: "#B8B6B4" }, { name: "???????????????", color: "#B8B6B4" }, { name: "????????????", color: "#B8B6B4" }, { name: "????????????", color: "#B8B6B4" }, { name: "???????????????", color: "#B8B6B4" }, { name: "????????????", color: "#B8B6B4" }, { name: "??????????????????", color: "#B8B6B4" }, { name: "??????????????????", color: "#B8B6B4" }],
            [{ name: "??????", color: "#B8B6B4" }, { name: "??????????????????", color: "#B8B6B4" }, { name: "?????????", color: "#B8B6B4" }, { name: "???????????????", color: "#B8B6B4" }, { name: "???????????????", color: "#B8B6B4" }, { name: "????????? ?????? ?????????", color: "#B8B6B4" }, { name: "?????????", color: "#B8B6B4" }, { name: "????????????", color: "#B8B6B4" }, { name: "????????????", color: "#B8B6B4" }, { name: "????????????", color: "#B8B6B4" }, { name: "???????????????", color: "#B8B6B4" }],
            [{ name: "????????????", color: "#B8B6B4" }, { name: "???????????????", color: "#B8B6B4" }, { name: "???????????????", color: "#B8B6B4" }, { name: "??????????????????", color: "#B8B6B4" }, { name: "?????????????????????", color: "#B8B6B4" }, { name: "?????????", color: "#B8B6B4" }, { name: "???????????? ?????? ????????????", color: "#B8B6B4" }, { name: "????????????", color: "#B8B6B4" }, { name: "???????????????", color: "#B8B6B4" }],
            [{ name: "????????? ?????????????????????", color: "#B8B6B4" }, { name: "?????????????????????", color: "#B8B6B4" }, { name: "????????????", color: "#B8B6B4" }, { name: "???????????????", color: "#B8B6B4" }, { name: "????????????", color: "#B8B6B4" }, { name: "?????????????????????", color: "#B8B6B4" }, { name: "???????????????", color: "#B8B6B4" }, { name: "????????? ?????????", color: "#B8B6B4" }, { name: "???????????????", color: "#B8B6B4" }, { name: "????????????????????????", color: "#B8B6B4" }, { name: "?????????", color: "#B8B6B4" }],
            [{ name: "?????????", color: "#B8B6B4" }, { name: "????????????", color: "#B8B6B4" }, { name: "??????", color: "#B8B6B4" }, { name: "???????????????", color: "#B8B6B4" }, { name: "????????????", color: "#B8B6B4" }, { name: "???????????????", color: "#B8B6B4" }, { name: "???????????????", color: "#B8B6B4" }, { name: "???????????????", color: "#B8B6B4" }, { name: "???????????????", color: "#B8B6B4" }, { name: "???????????? ???????????????", color: "#B8B6B4" }, { name: "???????????????", color: "#B8B6B4" }, { name: "??????????????????", color: "#B8B6B4" }, { name: "????????????", color: "#B8B6B4" }, { name: "?????????", color: "#B8B6B4" }, { name: "??????????????????", color: "#B8B6B4" }],
            [{ name: "??????????????????", color: "#B8B6B4" }, { name: "????????????", color: "#B8B6B4" }, { name: "???????????????", color: "#B8B6B4" }, { name: "????????????", color: "#B8B6B4" }, { name: "????????? ?????? ????????????", color: "#B8B6B4" }, { name: "????????????", color: "#B8B6B4" }, { name: "??????????????????", color: "#B8B6B4" }, { name: "???????????? ????????????", color: "#B8B6B4" }, { name: "???????????? ????????????????????? ??????????????? ??????????????????", color: "#B8B6B4" }],
            [{ name: "?????????", color: "#B8B6B4" }, { name: "?????????", color: "#B8B6B4" }, { name: "?????????", color: "#B8B6B4" }, { name: "??????", color: "#B8B6B4" }, { name: "???????????????", color: "#B8B6B4" }, { name: "????????????", color: "#B8B6B4" }, { name: "????????????", color: "#B8B6B4" }, { name: "????????? ???????????????", color: "#B8B6B4" }],
            [{ name: "??????????????? ?????? ?????????", color: "#B8B6B4" }, { name: "???????????? ??????????????? ?????? ?????????", color: "#B8B6B4" }, { name: "?????????????????? ?????? ?????????", color: "#B8B6B4" }, { name: "??????????????? ?????????", color: "#B8B6B4" }, { name: "?????????????????? ?????????", color: "#B8B6B4" }, { name: "????????????????????? ?????? ?????????", color: "#B8B6B4" }, { name: "????????? ?????? ?????????", color: "#B8B6B4" }, { name: "???????????????????????? ?????? ?????????", color: "#B8B6B4" }, { name: "????????????????????? ?????? ?????????", color: "#B8B6B4" }, { name: "??????????????? ?????? ?????????", color: "#B8B6B4" }],
            [{ name: "???????????????", color: "#B8B6B4" }, { name: "???????????????", color: "#B8B6B4" }, { name: "?????????", color: "#B8B6B4" }, { name: "???????????????", color: "#B8B6B4" }, { name: "?????????????????????", color: "#B8B6B4" }, { name: "????????????????????????", color: "#B8B6B4" }],
            [{ name: "????????????", color: "#B8B6B4" }, { name: "???????????? ?????????", color: "#B8B6B4" }, { name: "???????????? ????????? ??????????????????", color: "#B8B6B4" }, { name: "????????? ?????????", color: "#B8B6B4" }, { name: "????????????", color: "#B8B6B4" }, { name: "????????????????????????", color: "#B8B6B4" }, { name: "??????????????????", color: "#B8B6B4" }, { name: "?????????????????? ?????? ?????????", color: "#B8B6B4" }, { name: "????????? ?????????", color: "#B8B6B4" }, { name: "???????????????", color: "#B8B6B4" }, { name: "?????????", color: "#B8B6B4" }, { name: "????????? ?????????", color: "#B8B6B4" }]
        ]
    }

    const { colors } = useTheme()
    const [patient, setPatient] = useState({ Id: '', Name: '', Age: '', Contact: '', Address: '', Gender: 'Male' })
    const [visited, setVisited] = useState(new Date());
    const [dateValue, setDateValue] = useState(visited.getDate() + '/' + visited.getMonth() + '/' + visited.getFullYear());
    const [picker, setPicker] = useState(false);
    const [patientData, setPatientData] = useState([]);
    const [veg, setVeg] = useState([{ name: "Brinjal", color: "#B8B6B4" }, { name: "Banana-raw", color: "#B8B6B4" }, { name: "French Beans", color: "#B8B6B4" }, { name: "Capsicum", color: "#B8B6B4" }, { name: "Bitter Gourd", color: "#B8B6B4" }, { name: "Bottle Gourd", color: "#B8B6B4" }, { name: "Cabbage", color: "#B8B6B4" }, { name: "Cauliflower", color: "#B8B6B4" }, { name: "Cucumber", color: "#B8B6B4" }, { name: "Drum Stick", color: "#B8B6B4" }, { name: "Garlic", color: "#B8B6B4" }, { name: "Green Peas", color: "#B8B6B4" }, { name: "Ivy Gourd", color: "#B8B6B4" }, { name: "Lady Finger", color: "#B8B6B4" }, { name: "Mushroom", color: "#B8B6B4" }, { name: "Pumpkin", color: "#B8B6B4" }, { name: "Tamarind", color: "#B8B6B4" }, { name: "Broccoli", color: "#B8B6B4" }, { name: "Corn", color: "#B8B6B4" }, { name: "Tomato", color: "#B8B6B4" }, { name: "Peas", color: "#B8B6B4" }, { name: "Beans", color: "#B8B6B4" }])
    const [leafyVeg, setLeafyVeg] = useState([{ name: "Spinach", color: "#B8B6B4" }, { name: "Green Sorrel", color: "#B8B6B4" }, { name: "Amaranithus", color: "#B8B6B4" }, { name: "Fenugreek Leaves", color: "#B8B6B4" }, { name: "Sorrel leaves", color: "#B8B6B4" }, { name: "Coriander Leaves", color: "#B8B6B4" }, { name: "Mint Leaves", color: "#B8B6B4" }, { name: "Curry Leaves", color: "#B8B6B4" }, { name: "Chinese Spinach", color: "#B8B6B4" }])
    const [tubers, setTubers] = useState([{ name: "Potato", color: "#B8B6B4" }, { name: "Taro Root", color: "#B8B6B4" }, { name: "Yarn", color: "#B8B6B4" }, { name: "Tapoika", color: "#B8B6B4" }, { name: "Carrot", color: "#B8B6B4" }, { name: "Radish", color: "#B8B6B4" }, { name: "Onion", color: "#B8B6B4" }, { name: "Ginger", color: "#B8B6B4" }, { name: "Sweet Potato", color: "#B8B6B4" }, { name: "Beet Root", color: "#B8B6B4" }])
    const [grains, setGrains] = useState([{ name: "Barley", color: "#B8B6B4" }, { name: "Beans", color: "#B8B6B4" }, { name: "Bengalgram", color: "#B8B6B4" }, { name: "Maize", color: "#B8B6B4" }, { name: "Millet", color: "#B8B6B4" }, { name: "Paddy", color: "#B8B6B4" }, { name: "Pea", color: "#B8B6B4" }, { name: "Ragi", color: "#B8B6B4" }, { name: "Rice", color: "#B8B6B4" }, { name: "Sorghum", color: "#B8B6B4" }, { name: "Wheat", color: "#B8B6B4" }])
    const [millets, setMillets] = useState([{ name: "Finger", color: "#B8B6B4" }, { name: "Foxtail", color: "#B8B6B4" }, { name: "Pearl", color: "#B8B6B4" }, { name: "Buckwheat ", color: "#B8B6B4" }, { name: "Amaranth ", color: "#B8B6B4" }, { name: "Little", color: "#B8B6B4" }, { name: "Barnyard", color: "#B8B6B4" }, { name: "Broomcorn", color: "#B8B6B4" }, { name: "Koda", color: "#B8B6B4" }])
    const [sprouts, setSprouts] = useState([{ name: "Alfalfa Green", color: "#B8B6B4" }, { name: "Broccoli", color: "#B8B6B4" }, { name: "Mung Bean", color: "#B8B6B4" }, { name: "Wheat", color: "#B8B6B4" }, { name: "Radish", color: "#B8B6B4" }, { name: "Soybean", color: "#B8B6B4" }, { name: "Mustard", color: "#B8B6B4" }, { name: "Green Lentil", color: "#B8B6B4" }, { name: "Onion", color: "#B8B6B4" }, { name: "Sunflower", color: "#B8B6B4" }, { name: "Pea", color: "#B8B6B4" }])
    const [fruits, setFruits] = useState([{ name: "Apple", color: "#B8B6B4" }, { name: "Banana", color: "#B8B6B4" }, { name: "Mango", color: "#B8B6B4" }, { name: "Grapes", color: "#B8B6B4" }, { name: "Pomogranate", color: "#B8B6B4" }, { name: "Water Melon", color: "#B8B6B4" }, { name: "Papaya", color: "#B8B6B4" }, { name: "Guava", color: "#B8B6B4" }, { name: "Orange", color: "#B8B6B4" }, { name: "Sweet Lemon", color: "#B8B6B4" }, { name: "Lemon", color: "#B8B6B4" }, { name: "Musk Melon", color: "#B8B6B4" }, { name: "Sapota", color: "#B8B6B4" }, { name: "Jack Fruit", color: "#B8B6B4" }, { name: "Pine Apple", color: "#B8B6B4" }])
    const [meat, setMeat] = useState([{ name: "Chicken", color: "#B8B6B4" }, { name: "Fish", color: "#B8B6B4" }, { name: "Prawns", color: "#B8B6B4" }, { name: "Goat", color: "#B8B6B4" }, { name: "Beef", color: "#B8B6B4" }, { name: "Egg", color: "#B8B6B4" }, { name: "Crabs", color: "#B8B6B4" }, { name: "Dry Fish", color: "#B8B6B4" }, { name: "Other Sea foods", color: "#B8B6B4" }])
    const [milk, setMilk] = useState([{ name: "Milk", color: "#B8B6B4" }, { name: "Curd", color: "#B8B6B4" }, { name: "ButterMilk", color: "#B8B6B4" }, { name: "Ghee", color: "#B8B6B4" }, { name: "Butter", color: "#B8B6B4" }, { name: "Paneer", color: "#B8B6B4" }, { name: "Cheese", color: "#B8B6B4" }, { name: "Ice Creams", color: "#B8B6B4" }])
    const [oils, setOils] = useState([{ name: "Extra-virgin olive oil", color: "#B8B6B4" }, { name: "Light olive oil", color: "#B8B6B4" }, { name: "Coconut oil", color: "#B8B6B4" }, { name: "Canola oil", color: "#B8B6B4" }, { name: "Avocado oil", color: "#B8B6B4" }, { name: "Peanut oil", color: "#B8B6B4" }, { name: "Sesame oil", color: "#B8B6B4" }, { name: "SunFlower oil", color: "#B8B6B4" }, { name: "Groundnut oil", color: "#B8B6B4" }, { name: "Mustard oil", color: "#B8B6B4" }])
    const [tastes, setTastes] = useState([{ name: "Sweet", color: "#B8B6B4" }, { name: "Sour", color: "#B8B6B4" }, { name: "Salt", color: "#B8B6B4" }, { name: "Bitter", color: "#B8B6B4" }, { name: "Astringent", color: "#B8B6B4" }, { name: "Spicy", color: "#B8B6B4" }])
    const [others, setOthers] = useState([{ name: "Dry Fruits", color: "#B8B6B4" }, { name: "Ice Creams", color: "#B8B6B4" }, { name: "Hot Bewerages", color: "#B8B6B4" }, { name: "Cold Bewerages", color: "#B8B6B4" }, { name: "Junk Food", color: "#B8B6B4" }, { name: "Alcohol", color: "#B8B6B4" }, { name: "Smoking Cigerattes", color: "#B8B6B4" }, { name: "Chewing Tobacco", color: "#B8B6B4" }, { name: "Vegetable Soup", color: "#B8B6B4" }, { name: "Bone Soup", color: "#B8B6B4" }, { name: "Coffee", color: "#B8B6B4" }, { name: "Tea", color: "#B8B6B4" }, { name: "Green Tea", color: "#B8B6B4" }])
    const color = ["#6CF31E", "#B8B6B4", "#E94131", "#F97108"]
    const [selectedColor, setSelectedColor] = useState("#B8B6B4")
    const [eatMore, setEatMore] = useState([[], [], [], [], [], [], [], [], [], [], [], []])
    const [notEat, setNotEat] = useState([[], [], [], [], [], [], [], [], [], [], [], []])
    const [eat, setEat] = useState([[], [], [], [], [], [], [], [], [], [], [], []])
    const [eatCautiously, setEatCautiously] = useState([[], [], [], [], [], [], [], [], [], [], [], []])
    const [logo1, setLogo1] = useState(null)
    const [logo2, setLogo2] = useState(null)
    const [profile, setProfile] = useState([])
    const [text, setText] = useState("English")
    const [changed, setChanged] = useState(false)

    useEffect(async () => {
        const value = await AsyncStorage.getItem("google")
        let code = JSON.parse(await AsyncStorage.getItem("Branch"))

        db.transaction((tx) => {
            tx.executeSql(`SELECT * FROM Patient WHERE Branch=?`, [code.Branch], (_, { rows: { _array } }) => {
                setPatientData(_array)
                // console.log(_array)
            })
        })

        db.transaction((tx) => {
            tx.executeSql(`SELECT * FROM User`, [], (_, { rows: { _array } }) => {
                console.log(_array[0])
                setProfile(_array[0])
                fetch(`https://www.googleapis.com/drive/v3/files/${_array[0].Logo1}?fields=thumbnailLink`, {
                    headers: {
                        Authorization: "Bearer " + value,
                        "Content-Type": 'image/jpeg'
                    }
                }).then((response) => response.json())
                    .then((resJson) => {
                        console.log(resJson)
                        if (resJson.error) {
                            console.log(resJson)
                        }
                        else {
                            setLogo1(resJson.thumbnailLink)
                        }
                    })
                    .catch((error) => console.log(error));
                fetch(`https://www.googleapis.com/drive/v3/files/${_array[0].Logo2}?fields=thumbnailLink`, {
                    headers: {
                        Authorization: "Bearer " + value,
                        "Content-Type": 'image/jpeg'
                    }
                }).then((response) => response.json())
                    .then((resJson) => {
                        console.log(resJson)
                        if (resJson.error) {
                            console.log(resJson)
                        }
                        else {
                            setLogo2(resJson.thumbnailLink)
                        }
                    })
                    .catch((error) => console.log(error));
            })
        })

        setVeg(allData.English[0])
        setLeafyVeg(allData.English[1])
        setTubers(allData.English[2])
        setGrains(allData.English[3])
        setMillets(allData.English[4])
        setSprouts(allData.English[5])
        setFruits(allData.English[6])
        setMeat(allData.English[7])
        setMilk(allData.English[8])
        setOils(allData.English[9])
        setTastes(allData.English[10])
        setOthers(allData.English[11])
    }, [navigation])

    const selectedVeg = (index) => {
        let newData = [...veg]
        newData[index].color = selectedColor
        setVeg(newData)
    }

    const selectedLeaftVeg = (index) => {
        let newData = [...leafyVeg]
        newData[index].color = selectedColor
        setLeafyVeg(newData)
    }

    const selectedTubers = (index) => {
        let newData = [...tubers]
        newData[index].color = selectedColor
        setTubers(newData)
    }

    const selectedGrains = (index) => {
        let newData = [...grains]
        newData[index].color = selectedColor
        setGrains(newData)
    }

    const selectedMillets = (index) => {
        let newData = [...millets]
        newData[index].color = selectedColor
        setMillets(newData)
    }

    const selectedSprouts = (index) => {
        let newData = [...sprouts]
        newData[index].color = selectedColor
        setSprouts(newData)
    }

    const selectedFruits = (index) => {
        let newData = [...fruits]
        newData[index].color = selectedColor
        setFruits(newData)
    }

    const selectedMeat = (index) => {
        let newData = [...meat]
        newData[index].color = selectedColor
        setMeat(newData)
    }

    const selectedMilk = (index) => {
        let newData = [...milk]
        newData[index].color = selectedColor
        setMilk(newData)
    }

    const selectedOils = (index) => {
        let newData = [...oils]
        newData[index].color = selectedColor
        setOils(newData)
    }

    const selectedTastes = (index) => {
        let newData = [...tastes]
        newData[index].color = selectedColor
        setTastes(newData)
    }

    const selectedOthers = (index) => {
        let newData = [...others]
        newData[index].color = selectedColor
        setOthers(newData)
    }

    const htmlContent = `
    <html>
        <head>
            <style>
                .page {
                    height: 101%;
                    position: relative;
                    background-color: 'red';
                }
                .row {
                    display: flex;
                    flex-direction: row;
                }

                table {
                    font-family: arial, sans-serif;
                    border-collapse: collapse;
                    width: 100%;
                }

                .header td,
                .header th {
                    flex: 1;
                    text-align: center;
                    height : 30px
                }

                .header tr {
                    display: flex;
                }

                td,
                th {
                    flex: 1;
                }

                tr {
                    display: flex;
                }

                h4{
                    color : blue
                }
            </style>
        </head>
        <body>
            <div class="page">
                <div class="row">
                    <img src="${logo1}" height="75" width="150" />
                    <div style="text-align: center;width: 100%;">
                        <h1 style="color : rgb(0, 255, 55);margin: 0;">${profile.Hospital}</h1>
                        <h3 style="color : rgb(121, 96, 233);margin: 0;">${profile.Description}</h3>
                    </div>
                    <img src="${logo2}" height="75" width="150"/>
                </div>
                <hr style="height:2px;border-width:0;color:gray;background-color:red">
                <div style="text-align: center;">
                    <h3 style="color : red;">${profile.Address}</h3>
                    <h3>Ph. ${profile.Phone}, Mob. ${profile.LandLine}, E-mail : ${profile.Email}</h3>
                    <hr style="height:2px;border-width:0;color:gray;background-color:red">
                </div>
                <table class="header">
                    <tr>
                        <td>
                            <h4 style="float: left">Name :</h4>
                            <h5 style="float: left">${patient.Name}</h5>
                        </td>
                        <td>
                            <h4 style="float: left">Age :</h4>
                            <h5 style="float: left">${patient.Age}</h5>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h4 style="float: left">Address :</h4>
                            <h5 style="float: left">${patient.Address}</h5>
                        </td>
                        <td>
                            <h4 style="float: left">Contact :</h4>
                            <h5 style="float: left">${patient.Contact}</h5>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h4 style="float: left">Date :</h4>
                            <h5 style="float: left">${dateValue}</h5>
                        </td>
                        <td>
                            <h4 style="float: left">Gender :</h4>
                            <h5 style="float: left">${patient.Gender}</h5>
                        </td>
                    </tr>
                </table>
                <hr>
                <div>
                    <h1 style="color:red;text-align: center;text-decoration: underline;">Diet Chart</h1>
                    <h1 style="background-color:gray;text-align: center;font-size: 30px;">Eat Normally</h1>
                    <table>
                        <tr>
                            <td>
                                <h2>Vegetables</h2>
                                <p>${eat[0].map((item) => (item.name))}</p>
                                <h2>Leafy Vegetables</h2>
                                <p>${eat[1].map((item) => (item.name))}</p>
                                <h2>Tubers</h2>
                                <p>${eat[2].map((item) => (item.name))}</p>
                                <h2>Grains</h2>
                                <p>${eat[3].map((item) => (item.name))}</p>
                                <h2>Millets</h2>
                                <p>${eat[4].map((item) => (item.name))}</p>
                                <h2>Sprouts</h2>
                                <p>${eat[5].map((item) => (item.name))}</p>
                            </td>
                            <td>
                                <h2>Fruits</h2>
                                <p>${eat[6].map((item) => (item.name))}</p>
                                <h2>Meat</h2>
                                <p>${eat[7].map((item) => (item.name))}</p>
                                <h2>Milk Products</h2>
                                <p>${eat[8].map((item) => (item.name))}</p>
                                <h2>Oils</h2>
                                <p>${eat[9].map((item) => (item.name))}</p>
                                <h2>Tastes</h2>
                                <p>${eat[10].map((item) => (item.name))}</p>
                                <h2>Others</h2>
                                <p>${eat[11].map((item) => (item.name))}</p>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="page">
                <div class="row">
                    <img src="${logo1}" height="75" width="150" />
                    <div style="text-align: center;width: 100%;">
                        <h1 style="color : rgb(0, 255, 55);margin: 0;">${profile.Hospital}</h1>
                        <h3 style="color : rgb(121, 96, 233);margin: 0;">${profile.Description}</h3>
                    </div>
                    <img src="${logo2}" height="75" width="150"/>
                </div>
                <hr style="height:2px;border-width:0;color:gray;background-color:red">
                <div style="text-align: center;">
                    <h3 style="color : red;">${profile.Address}</h3>
                    <h3>Ph. ${profile.Phone}, Mob. ${profile.LandLine}, E-mail : ${profile.Email}</h3>
                    <hr style="height:2px;border-width:0;color:gray;background-color:red">
                </div>
                <table class="header">
                    <tr>
                        <td>
                            <h4 style="float: left">Name :</h4>
                            <h5 style="float: left">${patient.Name}</h5>
                        </td>
                        <td>
                            <h4 style="float: left">Age :</h4>
                            <h5 style="float: left">${patient.Age}</h5>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h4 style="float: left">Address :</h4>
                            <h5 style="float: left">${patient.Address}</h5>
                        </td>
                        <td>
                            <h4 style="float: left">Contact :</h4>
                            <h5 style="float: left">${patient.Contact}</h5>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h4 style="float: left">Date :</h4>
                            <h5 style="float: left">${dateValue}</h5>
                        </td>
                        <td>
                            <h4 style="float: left">Gender :</h4>
                            <h5 style="float: left">${patient.Gender}</h5>
                        </td>
                    </tr>
                </table>
                <hr>
                <div>
                    <h1 style="color:red;text-align: center;text-decoration: underline;">Diet Chart</h1>
                    <h1 style="background-color:green;text-align: center;font-size: 30px;">Eat More</h1>
                    <table>
                        <tr>
                            <td>
                                <h2>Vegetables</h2>
                                <p>${eatMore[0].map((item) => (item.name))}</p>
                                <h2>Leafy Vegetables</h2>
                                <p>${eatMore[1].map((item) => (item.name))}</p>
                                <h2>Tubers</h2>
                                <p>${eatMore[2].map((item) => (item.name))}</p>
                                <h2>Grains</h2>
                                <p>${eatMore[3].map((item) => (item.name))}</p>
                                <h2>Millets</h2>
                                <p>${eatMore[4].map((item) => (item.name))}</p>
                                <h2>Sprouts</h2>
                                <p>${eatMore[5].map((item) => (item.name))}</p>
                            </td>
                            <td>
                                <h2>Fruits</h2>
                                <p>${eatMore[6].map((item) => (item.name))}</p>
                                <h2>Meat</h2>
                                <p>${eatMore[7].map((item) => (item.name))}</p>
                                <h2>Milk Products</h2>
                                <p>${eatMore[8].map((item) => (item.name))}</p>
                                <h2>Oils</h2>
                                <p>${eatMore[9].map((item) => (item.name))}</p>
                                <h2>Tastes</h2>
                                <p>${eatMore[10].map((item) => (item.name))}</p>
                                <h2>Others</h2>
                                <p>${eatMore[11].map((item) => (item.name))}</p>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="page">
                <div class="row">
                    <img src="${logo1}" height="75" width="150" />
                    <div style="text-align: center;width: 100%;">
                        <h1 style="color : rgb(0, 255, 55);margin: 0;">${profile.Hospital}</h1>
                        <h3 style="color : rgb(121, 96, 233);margin: 0;">${profile.Description}</h3>
                    </div>
                    <img src="${logo2}" height="75" width="150"/>
                </div>
                <hr style="height:2px;border-width:0;color:gray;background-color:red">
                <div style="text-align: center;">
                    <h3 style="color : red;">${profile.Address}</h3>
                    <h3>Ph. ${profile.Phone}, Mob. ${profile.LandLine}, E-mail : ${profile.Email}</h3>
                    <hr style="height:2px;border-width:0;color:gray;background-color:red">
                </div>
                <table class="header">
                    <tr>
                        <td>
                            <h4 style="float: left">Name :</h4>
                            <h5 style="float: left">${patient.Name}</h5>
                        </td>
                        <td>
                            <h4 style="float: left">Age :</h4>
                            <h5 style="float: left">${patient.Age}</h5>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h4 style="float: left">Address :</h4>
                            <h5 style="float: left">${patient.Address}</h5>
                        </td>
                        <td>
                            <h4 style="float: left">Contact :</h4>
                            <h5 style="float: left">${patient.Contact}</h5>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h4 style="float: left">Date :</h4>
                            <h5 style="float: left">${dateValue}</h5>
                        </td>
                        <td>
                            <h4 style="float: left">Gender :</h4>
                            <h5 style="float: left">${patient.Gender}</h5>
                        </td>
                    </tr>
                </table>
                <hr>
                <div>
                    <h1 style="color:red;text-align: center;text-decoration: underline;">Diet Chart</h1>
                    <h1 style="background-color:orange;text-align: center;font-size: 30px;">Eat Cautiously</h1>
                    <table>
                        <tr>
                            <td>
                                <h2>Vegetables</h2>
                                <p>${eatCautiously[0].map((item) => (item.name))}</p>
                                <h2>Leafy Vegetables</h2>
                                <p>${eatCautiously[1].map((item) => (item.name))}</p>
                                <h2>Tubers</h2>
                                <p>${eatCautiously[2].map((item) => (item.name))}</p>
                                <h2>Grains</h2>
                                <p>${eatCautiously[3].map((item) => (item.name))}</p>
                                <h2>Millets</h2>
                                <p>${eatCautiously[4].map((item) => (item.name))}</p>
                                <h2>Sprouts</h2>
                                <p>${eatCautiously[5].map((item) => (item.name))}</p>
                            </td>
                            <td>
                                <h2>Fruits</h2>
                                <p>${eatCautiously[6].map((item) => (item.name))}</p>
                                <h2>Meat</h2>
                                <p>${eatCautiously[7].map((item) => (item.name))}</p>
                                <h2>Milk Products</h2>
                                <p>${eatCautiously[8].map((item) => (item.name))}</p>
                                <h2>Oils</h2>
                                <p>${eatCautiously[9].map((item) => (item.name))}</p>
                                <h2>Tastes</h2>
                                <p>${eatCautiously[10].map((item) => (item.name))}</p>
                                <h2>Others</h2>
                                <p>${eatCautiously[11].map((item) => (item.name))}</p>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="page">
                <div class="row">
                    <img src="${logo1}" height="75" width="150" />
                    <div style="text-align: center;width: 100%;">
                        <h1 style="color : rgb(0, 255, 55);margin: 0;">${profile.Hospital}</h1>
                        <h3 style="color : rgb(121, 96, 233);margin: 0;">${profile.Description}</h3>
                    </div>
                    <img src="${logo2}" height="75" width="150"/>
                </div>
                <hr style="height:2px;border-width:0;color:gray;background-color:red">
                <div style="text-align: center;">
                    <h3 style="color : red;">${profile.Address}</h3>
                    <h3>Ph. ${profile.Phone}, Mob. ${profile.LandLine}, E-mail : ${profile.Email}</h3>
                    <hr style="height:2px;border-width:0;color:gray;background-color:red">
                </div>
                <table class="header">
                    <tr>
                        <td>
                            <h4 style="float: left">Name :</h4>
                            <h5 style="float: left">${patient.Name}</h5>
                        </td>
                        <td>
                            <h4 style="float: left">Age :</h4>
                            <h5 style="float: left">${patient.Age}</h5>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h4 style="float: left">Address :</h4>
                            <h5 style="float: left">${patient.Address}</h5>
                        </td>
                        <td>
                            <h4 style="float: left">Contact :</h4>
                            <h5 style="float: left">${patient.Contact}</h5>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h4 style="float: left">Date :</h4>
                            <h5 style="float: left">${dateValue}</h5>
                        </td>
                        <td>
                            <h4 style="float: left">Gender :</h4>
                            <h5 style="float: left">${patient.Gender}</h5>
                        </td>
                    </tr>
                </table>
                <hr>
                <div>
                    <h1 style="color:red;text-align: center;text-decoration: underline;">Diet Chart</h1>
                    <h1 style="background-color:red;text-align: center;font-size: 30px;">Don't Eat</h1>
                    <table>
                        <tr>
                            <td>
                                <h2>Vegetables</h2>
                                <p>${notEat[0].map((item) => (item.name))}</p>
                                <h2>Leafy Vegetables</h2>
                                <p>${notEat[1].map((item) => (item.name))}</p>
                                <h2>Tubers</h2>
                                <p>${notEat[2].map((item) => (item.name))}</p>
                                <h2>Grains</h2>
                                <p>${notEat[3].map((item) => (item.name))}</p>
                                <h2>Millets</h2>
                                <p>${notEat[4].map((item) => (item.name))}</p>
                                <h2>Sprouts</h2>
                                <p>${notEat[5].map((item) => (item.name))}</p>
                            </td>
                            <td>
                                <h2>Fruits</h2>
                                <p>${notEat[6].map((item) => (item.name))}</p>
                                <h2>Meat</h2>
                                <p>${notEat[7].map((item) => (item.name))}</p>
                                <h2>Milk Products</h2>
                                <p>${notEat[8].map((item) => (item.name))}</p>
                                <h2>Oils</h2>
                                <p>${notEat[9].map((item) => (item.name))}</p>
                                <h2>Tastes</h2>
                                <p>${notEat[10].map((item) => (item.name))}</p>
                                <h2>Others</h2>
                                <p>${notEat[11].map((item) => (item.name))}</p>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </body>
    </html>`;

    const showCalender = (text) => {
        if (text == "visited")
            setPicker(true)
        else
            setFollowUpPicker(true)
    }

    const change = (selectedDate) => {
        // console.log(selectedDate.type)
        setPicker(false)
        if (selectedDate.type == "set") {
            const currentDate = selectedDate.nativeEvent.timestamp
            setVisited(currentDate)
            setDateValue(currentDate.getDate() + '/' + currentDate.getMonth() + '/' + currentDate.getFullYear())
        }
    }

    const check = (val) => {

        for (let i = 0; i < patientData.length; i++) {
            if (val == patientData[i].Id) {
                // console.log(patientData[i])
                setPatient(patientData[i])
                break
            }
            else {
                setPatient({ Id: val, Name: '', Age: '', Contact: '', Address: '', Gender: 'Male' })
            }
        }
    }

    const createPDF = async () => {
        setChanged(!changed)
        Print.printAsync(
            {
                html: htmlContent
            },
        ).then(res => console.log(res))
    };

    const sharePDF = async () => {
        setChanged(!changed)
        Print.printToFileAsync({
            html: htmlContent,
        }).then(res => {
            openShareDialogAsync(res.uri)
        })

    };

    async function openShareDialogAsync(link) {
        if (!(await Sharing.isAvailableAsync())) {
            alert(`Uh oh, sharing isn't available on your platform`);
            return;
        }
        Sharing.shareAsync(link);
    };

    const select = () => {
        let eatMoreData = [{ vegetables: [] }, { leafy: [] }, { grains: [] }, { tubers: [] }, { millets: [] }, { sprouts: [] }, { fruits: [] }, { meat: [] }, { milk: [] }, { oils: [] }, { tastes: [] }, { others: [] }]
        let notEatData = [{ vegetables: [] }, { leafy: [] }, { grains: [] }, { tubers: [] }, { millets: [] }, { sprouts: [] }, { fruits: [] }, { meat: [] }, { milk: [] }, { oils: [] }, { tastes: [] }, { others: [] }]
        let eatData = [{ vegetables: [] }, { leafy: [] }, { grains: [] }, { tubers: [] }, { millets: [] }, { sprouts: [] }, { fruits: [] }, { meat: [] }, { milk: [] }, { oils: [] }, { tastes: [] }, { others: [] }]
        let eatCautiouslyData = [{ vegetables: [] }, { leafy: [] }, { grains: [] }, { tubers: [] }, { millets: [] }, { sprouts: [] }, { fruits: [] }, { meat: [] }, { milk: [] }, { oils: [] }, { tastes: [] }, { others: [] }]

        let data = [veg, leafyVeg, grains, tubers, millets, sprouts, fruits, meat, milk, oils, tastes, others]
        for (let i = 0; i < data.length; i++) {
            eatMoreData[i] = data[i].filter((prev) => prev.color == "#6CF31E")
            notEatData[i] = data[i].filter((prev) => prev.color == "#E94131")
            eatCautiouslyData[i] = data[i].filter((prev) => prev.color == "#F97108")
            eatData[i] = data[i].filter((prev) => prev.color == "#B8B6B4")
        }
        setEatMore(eatMoreData)
        setNotEat(notEatData)
        setEat(eatData)
        setEatCautiously(eatCautiouslyData)
    }

    const language = (val) => {
        if (val == "??????????????????") {
            setVeg(allData.Telugu[0])
            setLeafyVeg(allData.Telugu[1])
            setTubers(allData.Telugu[2])
            setGrains(allData.Telugu[3])
            setMillets(allData.Telugu[4])
            setSprouts(allData.Telugu[5])
            setFruits(allData.Telugu[6])
            setMeat(allData.Telugu[7])
            setMilk(allData.Telugu[8])
            setOils(allData.Telugu[9])
            setTastes(allData.Telugu[10])
            setOthers(allData.Telugu[11])
        }
        else if (val == "??????????????????") {
            setVeg(allData.Hindi[0])
            setLeafyVeg(allData.Hindi[1])
            setTubers(allData.Hindi[2])
            setGrains(allData.Hindi[3])
            setMillets(allData.Hindi[4])
            setSprouts(allData.Hindi[5])
            setFruits(allData.Hindi[6])
            setMeat(allData.Hindi[7])
            setMilk(allData.Hindi[8])
            setOils(allData.Hindi[9])
            setTastes(allData.Hindi[10])
            setOthers(allData.Hindi[11])
        }
        else if (val == "English") {
            setVeg(allData.English[0])
            setLeafyVeg(allData.English[1])
            setTubers(allData.English[2])
            setGrains(allData.English[3])
            setMillets(allData.English[4])
            setSprouts(allData.English[5])
            setFruits(allData.English[6])
            setMeat(allData.English[7])
            setMilk(allData.English[8])
            setOils(allData.English[9])
            setTastes(allData.English[10])
            setOthers(allData.English[11])
        }
    }

    return (
        <ScrollView style={{ backgroundColor: colors.back, flex: 1 }}>
            <View style={[styles.container, { backgroundColor: colors.crd }]}>

                <View style={styles.field}>
                    <Text style={{ color: colors.txt, fontSize: colors.font, flex: 1 }}>Patient Id </Text>
                    <View style={{ flex: 2, justifyContent: "center", backgroundColor: "white", flexDirection: "row", alignItems: "center" }}>
                        <Text style={{ color: colors.txt, fontSize: colors.font, flex: 1 }}>{patient.Id}</Text>
                        <View style={{ flex: 1 }}>
                            <Picker onValueChange={(val) => { check(val) }}>
                                <Picker.Item label="" style={{ fontSize: colors.font }}> </Picker.Item>
                                {patientData.map((item) => (
                                    <Picker.Item key={item.Id} label={item.Name} value={item.Id} style={{ fontSize: colors.font }}></Picker.Item>
                                ))}
                            </Picker>
                        </View>
                    </View>
                </View>
                <View style={styles.field}>
                    <Text style={{ color: colors.txt, fontSize: colors.font, flex: 1 }}>Date :</Text>
                    <View style={{ flex: 2, flexDirection: "row" }}>
                        <Text style={{ color: colors.txt, fontSize: colors.font }}>{dateValue}</Text>
                        <AntDesign name="calendar" size={colors.font + 3} color={colors.txt} onPress={() => showCalender('visited')} style={styles.calender} />
                        {picker && <DatePicker mode="date" value={visited} onChange={(val) => change(val)}></DatePicker>}
                    </View>
                </View>
                <View style={styles.field}>
                    <Text style={{ color: colors.txt, fontSize: colors.font, flex: 1 }}>Name :</Text>
                    <Text style={{ color: colors.txt, fontSize: colors.font, flex: 2, backgroundColor: "white", padding: 10, borderRadius: 10 }}>{patient.Name}</Text>
                </View>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "flex-end", paddingRight: 40 }}>
                <Ionicons name="checkmark-circle" color={colors.txt} size={35} onPress={() => { select() }} />
                <Ionicons name="print-outline" color={colors.txt} size={35} onPress={() => { createPDF() }} />
                <Ionicons name="share-social" color={colors.txt} size={35} onPress={() => { sharePDF() }} />
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", width: '50%' }}>
                <Text style={{ flex: 1, fontSize: 24 }}>{text}</Text>
                <Picker style={{ flex: 1 }} onValueChange={(val) => { language(val), setText(val) }}>
                    <Picker.Item label="" ></Picker.Item>
                    <Picker.Item label="English" value="English"></Picker.Item>
                    <Picker.Item label="??????????????????" value="??????????????????"></Picker.Item>
                    <Picker.Item label="??????????????????" value="??????????????????"></Picker.Item>
                </Picker>
            </View>
            <ScrollView style={{ flex: 1, marginBottom: 20, marginTop: 50, width: '100%' }} nestedScrollEnabled={true}>
                <View style={{ flex: 1, flexDirection: "row" }}>
                    {color.map((item) => (
                        <TouchableOpacity key={item} style={{ flex: 1, backgroundColor: item, width: 20, height: 40, margin: 10 }} onPress={() => setSelectedColor(item)}>
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={{ flex: 1, flexDirection: "row" }}>
                    <View style={styles.box}>
                        <Text style={styles.header}>Vegetables</Text>
                        <ScrollView nestedScrollEnabled={true}>
                            {veg.map((item, index) => (
                                <TouchableOpacity key={item.name} style={[styles.content, { backgroundColor: item.color }]} onPress={() => selectedVeg(index)}>
                                    <Text>{item.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                    <View style={styles.box}>
                        <Text style={styles.header}>Leafy Vegetables</Text>
                        <ScrollView nestedScrollEnabled={true}>
                            {leafyVeg.map((item, index) => (
                                <TouchableOpacity key={item.name} style={[styles.content, { backgroundColor: item.color }]} onPress={() => selectedLeaftVeg(index)}>
                                    <Text>{item.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: "row" }}>
                    <View style={styles.box}>
                        <Text style={styles.header}>Tubers</Text>
                        <ScrollView nestedScrollEnabled={true}>
                            {tubers.map((item, index) => (
                                <TouchableOpacity key={item.name} style={[styles.content, { backgroundColor: item.color }]} onPress={() => selectedTubers(index)}>
                                    <Text>{item.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                    <View style={styles.box}>
                        <Text style={styles.header}>Grains</Text>
                        <ScrollView nestedScrollEnabled={true}>
                            {grains.map((item, index) => (
                                <TouchableOpacity key={item.name} style={[styles.content, { backgroundColor: item.color }]} onPress={() => selectedGrains(index)}>
                                    <Text>{item.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: "row" }}>
                    <View style={styles.box}>
                        <Text style={styles.header}>Millets</Text>
                        <ScrollView nestedScrollEnabled={true}>
                            {millets.map((item, index) => (
                                <TouchableOpacity key={item.name} style={[styles.content, { backgroundColor: item.color }]} onPress={() => selectedMillets(index)}>
                                    <Text>{item.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                    <View style={styles.box}>
                        <Text style={styles.header}>Sprouts</Text>
                        <ScrollView nestedScrollEnabled={true}>
                            {sprouts.map((item, index) => (
                                <TouchableOpacity key={item.name} style={[styles.content, { backgroundColor: item.color }]} onPress={() => selectedSprouts(index)}>
                                    <Text>{item.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: "row" }}>
                    <View style={styles.box}>
                        <Text style={styles.header}>Fruits</Text>
                        <ScrollView nestedScrollEnabled={true}>
                            {fruits.map((item, index) => (
                                <TouchableOpacity key={item.name} style={[styles.content, { backgroundColor: item.color }]} onPress={() => selectedFruits(index)}>
                                    <Text>{item.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                    <View style={styles.box}>
                        <Text style={styles.header}>Meat</Text>
                        <ScrollView nestedScrollEnabled={true}>
                            {meat.map((item, index) => (
                                <TouchableOpacity key={item.name} style={[styles.content, { backgroundColor: item.color }]} onPress={() => selectedMeat(index)}>
                                    <Text>{item.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: "row" }}>
                    <View style={styles.box}>
                        <Text style={styles.header}>Milk Products</Text>
                        <ScrollView nestedScrollEnabled={true}>
                            {milk.map((item, index) => (
                                <TouchableOpacity key={item.name} style={[styles.content, { backgroundColor: item.color }]} onPress={() => selectedMilk(index)}>
                                    <Text>{item.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                    <View style={styles.box}>
                        <Text style={styles.header}>Oils</Text>
                        <ScrollView nestedScrollEnabled={true}>
                            {oils.map((item, index) => (
                                <TouchableOpacity key={item.name} style={[styles.content, { backgroundColor: item.color }]} onPress={() => selectedOils(index)}>
                                    <Text>{item.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: "row" }}>
                    <View style={styles.box}>
                        <Text style={styles.header}>Tastes</Text>
                        <ScrollView nestedScrollEnabled={true}>
                            {tastes.map((item, index) => (
                                <TouchableOpacity key={item.name} style={[styles.content, { backgroundColor: item.color }]} onPress={() => selectedTastes(index)}>
                                    <Text>{item.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                    <View style={styles.box}>
                        <Text style={styles.header}>Others</Text>
                        <ScrollView nestedScrollEnabled={true}>
                            {others.map((item, index) => (
                                <TouchableOpacity key={item.name} style={[styles.content, { backgroundColor: item.color }]} onPress={() => selectedOthers(index)}>
                                    <Text>{item.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>
        </ScrollView>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        elevation: 3,
        borderRadius: 10,
        shadowOpacity: 0.3,
        shadowRadius: 3,
        margin: 30
    },
    rowFields: {
        flex: 1,
        flexDirection: "row"
    },
    field: {
        flex: 1,
        flexDirection: "row",
        alignItems: 'center',
        margin: 5
    },
    header: {
        backgroundColor: "#8BD7E0",
        elevation: 5,
        padding: 10,
    },
    box:
    {
        flex: 1,
        justifyContent: "center",
        margin: 5,
        borderWidth: 1,
        height: 250
    },
    content: {
        marginBottom: 5,
        elevation: 5,
        padding: 10,
        justifyContent: "center"
    },
    image: {
        flex: 1,
        justifyContent: "center"
    }
})