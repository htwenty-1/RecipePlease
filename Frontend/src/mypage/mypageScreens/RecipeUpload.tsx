import axios from "axios";
import Color from "color";
import React, { Component, useState } from "react";
import { StyleSheet, Text, View, TextInput, FlatList, ScrollView, Alert, Dimensions, Image, TouchableOpacity, ToastAndroid } from "react-native";
import { Button } from "react-native-paper";
import RNPickerSelect from 'react-native-picker-select'
import Icon from 'react-native-vector-icons/Ionicons'
import TagInput from 'react-native-tags-input';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import * as L from '../../store/login'
import { AppState } from "../../store";
import { white } from "react-native-paper/lib/typescript/styles/colors";
import DetailList from "./DetailList";
import { useSelector } from "react-redux";
import config from "../../project.config"
import { useNavigation } from "@react-navigation/native";
import RecipeRecommendList from "../../recipe/RecipeRecommendList";
/* npm install @react-native-picker/picker */

export default function UploadScreen() {
    const navigation = useNavigation()
    // 멤버아이디
    const log = useSelector<AppState, L.State>((state) => state.login)
    const { loggedIn, loggedUser } = log

    // 카테고리
    const [recipeBigCategory, setPickerSelect] = useState('')
    const [recipeSmallCategory, setPickerSelect2] = useState('')

    const [seq, setSeq] = useState()

    // 사진 url
    const [titleimgurl, setTitleimgurl] = useState("")


    // 제목, 내용, 가격
    const [recipeTitle, setTitle] = useState('')
    const [recipeContent, setContent] = useState('')
    const [recipePrice, setPrice] = useState('')

    // 태그
    const [tags, setTags] = useState({
        tag: '',
        tagsArray: []
    });
    const [tagsColor, setTagsColor] = useState("")
    const [tagsText, setTagsText] = useState("")


    // 레시피 내용 순서 추가
    const [tests, setTests] = useState([
        {
            imglist: "",
            imgText: ""
        }
    ])

    const [countList, setCountList] = useState([0])
    const [imglist, setImglist] = useState("")
    const [imgText, setImgText] = useState("")

    const [list, setList] = useState([<DetailList setData={setImglist} setData2={setTests} setData3={tests} setData4={0} setData5={setImgText} />])

    console.log("RecipeUpload : " + imglist)

    const onAddDetailDiv = () => {
        let countArr = [...countList]
        let counter = countArr.slice(-1)[0]
        counter += 1
        countArr.push(counter)	// index 사용 X
        // countArr[counter] = counter	// index 사용 시 윗줄 대신 사용	
        setCountList(countArr)
        let num = list
        console.log("tests: " + JSON.stringify(tests[counter - 1]))
        tests.push({ imglist: "", imgText: "" })
        num.push(<DetailList setData={setImglist} setData2={setTests} setData3={tests} setData4={counter} setData5={setImgText} />)
        setList(num)
        //onCreate()
    }

    // const onCreate = () => {
    //     console.log("onCreate 테스트 : " + imglist)
    //     console.log("onCreate 테스트 : " + imgText)
    //     const test = {
    //         imglist,
    //         imgText
    //     }
    //     setTests([...tests, test])
    // }



    // const addImage = () => {
    //     launchCamera({ saveToPhotos: true }, response => {
    //         setData(response.assets[0].uri)
    //     })
    // }


    // 썸네일 이미지 등록
    const titleimgshow = () => {
        launchImageLibrary({}, response => {
            setTitleimgurl(response.assets[0].uri)
        })
    }


    // 업로드 버튼
    const RecipeUploadBtn = () => {
        // console.log("memberId : " + loggedUser.memberId)
        // console.log("제목 : " + recipeTitle)
        // console.log("내용 : " + recipeContent)
        // console.log("대분류 : " + recipeBigCategory)
        // console.log("소분류 : " + recipeSmallCategory)
        // console.log("굿즈태그 : " + tags.tagsArray)
        // console.log("레시피가격 : " + recipePrice)
        // console.log("이미지 경로 : " + titleimgurl)

        // 레시피 업로드
        const uploadRecipe = () => {
            axios.get(config.address + "insertRecipe",
                {
                    params: {
                        memberId: loggedUser.memberId,
                        recipeTitle: recipeTitle,
                        recipeContent: recipeContent,
                        recipeBigCategory: recipeBigCategory,
                        recipeSmallCategory: recipeSmallCategory,
                        recipeVideoUrl: "test",
                        recipeGoodsTag: String(tags.tagsArray),
                        recipePrice: recipePrice
                    }
                }).then(function (response) {
                    console.log("seq값 : " + response.data)

                    if (response.data != null && response.data != "") {
                        Alert.alert("레시피 추가되었습니다..")
                        setSeq(response.data)
                        uploadRecipeThumbnailImg(response.data)
                        uploadRecipeContentImg(response.data)
                        navigation.navigate('RecipeNavigator' as never,{
                            screen: 'RecipeDetail',
                            params: {
                                seq:  response.data, 
                                category: 'recipe'
                            }
                        } as never)
                    }

                }).catch(function () {
                    Alert.alert("레시피 추가되지 않았습니다.")
                })
        }

        // 썸네일 이미지 업로드
        const uploadRecipeThumbnailImg = (temp: any) => {
            axios.get(config.address + "uploadRecipeImg",
                {
                    params: {
                        docsSeq: temp,
                        photoTitle: "thumbnail",
                        photoContent: recipeTitle,
                        photoCategory: "recipe",
                        photoUrl: titleimgurl

                    }
                }).then(function (response) {
                    console.log(response.data)

                    if (response.data == "YES") {
                        //Alert.alert("이미지 추가되었습니다..")
                    }
                }).catch(function () {
                    //Alert.alert("이미지 추가되지 않았습니다.")
                })
        }

        // 레시피 순서 이미지 업로드
        const uploadRecipeContentImg = (temp: any) => {
            for (let i = 0; i < tests.length; i++) {
                axios.get(config.address + "uploadRecipeImg",
                    {
                        params: {

                            docsSeq: temp,
                            photoTitle: "cookOrder",
                            photoContent: tests[i].imgText,
                            photoCategory: "recipe",
                            photoUrl: tests[i].imglist,

                        }

                    }).then(function (response) {
                        console.log(response.data)

                        if (response.data == "YES") {
                            //Alert.alert("이미지 추가되었습니다..")
                        }
                    }).catch(function () {
                        //Alert.alert("이미지 추가되지 않았습니다.")
                    })
            }
        }
        uploadRecipe()
    }

    const values = [
        { label: '축산물', value: 'livestock' },
        { label: '해산물', value: 'seafood' },
    ]
    const values2 = [
        { label: '1인용', value: 'personal' },
        { label: '접대용', value: 'entertain' },
        { label: '야식용', value: 'nightmeal' }
    ]

    return (
        <View>
            <ScrollView style={styles.container}>
                <View style={styles.frame}>
                    <Text style={styles.text} >레시피제목</Text>
                </View>
                <View style={styles.titleframe}>
                    <TextInput style={styles.textinput} placeholder="예) 소고기 미역국 끓이기" value={recipeTitle} onChangeText={(recipeTitle) => setTitle(recipeTitle)}></TextInput>
                </View>

                <View style={styles.picture}>
                    <TouchableOpacity onPress={titleimgshow} style={styles.camera}>
                        <Image
                            source={{ uri: titleimgurl }}
                            style={styles.camera}
                        ></Image>
                    </TouchableOpacity>
                </View>

                <View style={styles.recipeframe}>
                    <Text style={styles.recipytext}>레시피내용</Text>
                    <Button style={styles.addbutton} onPress={onAddDetailDiv}> 추가</Button>

                </View>
                <View style={styles.contentframe}>
                    <TextInput style={styles.textinput} value={recipeContent} onChangeText={(recipeContent) => setContent(recipeContent)} placeholder="1) 소고기는 기름기를 떼어내고 적당한 크기로 잘라주세요.&#10;2) 준비된 양념으로 먼저 고기를 조물조물 재워 둡니다.&#10;3) 그 사이 양파와 버섯, 대파도 썰어서 준비하세요.&#10;4) 고기가 반쯤 익어갈 때 양파를 함께 볶아요." multiline={true}></TextInput>
                </View>
                <View>
                    {list.map((item: any, i: any) => (
                        item
                    ))}
                </View>

                {/* <DetailList countList={countList} /> */}

                <View style={styles.frame}>
                    <Text style={styles.text}>카테고리</Text>
                </View>
                <View style={styles.categoryframe}>
                    <View style={styles.picker}>
                        <RNPickerSelect onValueChange={(value) => setPickerSelect(value)}
                            items={values}
                            placeholder={{
                                label: '대분류'
                            }}
                        >
                        </RNPickerSelect>
                    </View>
                    <View style={styles.picker}>
                        <RNPickerSelect onValueChange={(value) => setPickerSelect2(value)}
                            items={values2}
                            placeholder={{
                                label: '소분류'
                            }}
                        >
                        </RNPickerSelect>
                    </View>
                </View>
                <View style={styles.frame}>
                    <Text style={styles.text}>굿즈태그</Text>
                </View>
                <View style={styles.goodsframe}>
                    <TagInput updateState={(tags: any) => { setTags(tags) }}
                        tags={tags}
                        placeholder="Tags..."
                        label='Press comma & space to add a tag'
                        labelStyle={{ color: '#fff' }}
                        leftElement={<Icon name='pricetag' color='blue' />}
                        leftElementContainerStyle={{ marginLeft: 3 }}
                        containerStyle={{ width: (Dimensions.get('window').width - 40) }}
                        inputContainerStyle={[styles.textInput, { backgroundColor: '#fff' }]}
                        inputStyle={{ color: '#fff' }}
                        onFocus={() => {
                            setTagsColor('#fff')
                            setTagsText('#3ca897')
                        }}
                        onBlur={() => {
                            setTagsColor('#fff')
                            setTagsText('#3ca897')
                        }}
                        autoCorrect={false}
                        tagStyle={styles.tag}
                        tagTextStyle={styles.tagText}
                        keysForTag={', '}

                    />
                </View>
                <View style={styles.frame}>
                    <Text style={styles.text}>레시피가격</Text>
                </View>
                <View style={styles.goodsframe}>
                    <TextInput style={styles.textinput} value={(recipePrice)} onChangeText={(recipePrice) => setPrice(recipePrice)} ></TextInput>
                </View>



                <Button style={styles.btn} onPress={RecipeUploadBtn}>레시피작성</Button>
            </ScrollView>

        </View>
    )
}

//css
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 700,
    },
    recipeframe: {
        width: '100%',
        height: 55,
        backgroundColor: "#ced4da",
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',

    },
    frame: {
        width: '100%',
        height: 55,
        backgroundColor: "#ced4da",
        justifyContent: 'center'
    },
    titleframe: {
        width: '100%',
        height: 70,
        justifyContent: 'center',
        backgroundColor: "white"
    },
    contentframe: {
        width: '100%',
        height: 250,
        backgroundColor: "white"
    },
    contentpictureframe: {
        width: '100%',
        height: 160,
        flex: 1,
        flexDirection: 'row'

    },
    categoryframe: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        backgroundColor: "white",
        flexDirection: "row",
        flexWrap: "wrap"
    },
    goodsframe: {
        width: '100%',
        height: 100,
        justifyContent: 'center',
        backgroundColor: "white",
    },

    picture: {
        width: '100%',
        height: 350,
        backgroundColor: "#f8f9fa",
        alignItems: 'center',
        justifyContent: 'center'

    },
    text: {
        fontWeight: "bold",
        marginLeft: 10,
        fontSize: 18,
        color: "black",
    },
    recipytext: {
        fontWeight: "bold",
        marginLeft: 10,
        fontSize: 18,
        color: "black",
        flex: 1,
        marginTop: 15
    },


    textinput: {
        marginLeft: 10,
        fontSize: 15,

    },
    picker: {
        flex: 1,
        width: '50%',
    },
    btn: {
        marginTop: 20,
        marginVertical: 8,
        height: 400
    },
    textInput: {
        height: 30,
        borderColor: 'white',
        borderWidth: 1,
        marginTop: -35,
        borderRadius: 5,
        padding: 3,
    },
    tag: {
        backgroundColor: '#fff'
    },
    tagText: {
        color: '#3ca897'
    },

    camera: {
        width: '100%',
        height: '100%'
    },
    contentcameraframe: {
        width: 120,
        height: 120,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        flex: 1
    },
    contentcamera: {
        width: 120,
        height: 120,
        backgroundColor: 'white',

    },

    picturtext: {
        fontWeight: "bold",
        marginLeft: 10,
        fontSize: 18,
        color: "black",
        textAlign: 'center'
    },

    addbutton: {
        flex: 1
    }
})