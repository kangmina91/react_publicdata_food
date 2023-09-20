import { Route, Routes } from "react-router-dom";
import Footer from "./pages/Footer";
import Header from "./pages/Header";
import Main from "./pages/Main";
import axios from "axios";
import { useEffect, useState } from "react";
import AllList from "./pages/AllList";
import GuList from "./pages/GuList";

import './css/style.scss';
import Item from "./pages/Item";


const App = () => {
    const [food, setFood] = useState([]);
    const [gu, setGu] = useState([]);

    const key = `nmPIjJ%2Bj0FufPiP6k4BLPlq3n%2B46QZN%2B6hgSINrrxqk3nNwnoHX2ynqX6Dlgr3xFeivGPus2vgmh6Ifx1vdu1g%3D%3D`
    // function 앞에 async를 붙이면 해당 함수는 항상 Promise 반환/ 함수 안에서 await 사용 할 수 있음.
    const getData = async () => {
        //Axios는 브라우저, Node.js를 위한 Promise API를 활용하는 HTTP 비동기 통신 라이브러리
        const d = await axios.get(`https://apis.data.go.kr/6260000/FoodService/getFoodKr?serviceKey=${key}&pageNo=1&numOfRows=150&resultType=json`)
        console.log("1 d", d);
        console.log("2 d.data", d.data);
        console.log("3 d.data.getFoodKr", d.data.getFoodKr);

        console.log("4 d.data.getFoodKr.item", d.data.getFoodKr.item);
        // await - await는 async 함수 안에서만 동작. 해당 Promise 작업이 완료될 때까지 비동기적으로 기다림.
        const r = await d.data.getFoodKr.item;
        setFood(r);
        console.log("d.data.getFoodKr.item", r);

        // map 은 꺼집어내면서 새로운 배열을 만든다
        const g = r.map(it => it.GUGUN_NM);
        // => 화살표 함수 

        console.log("ㅇㅇ구 배열이 중복 나열 되고 있음", g);
        // ... JavaScript spread 연산자 - 스프레드 연산자는 map, set, object와 같이 반복 가능한 객체 배열의 원소값을 펼쳐서 복제
        // 즉 원본 배열에 영향을 주지 않고 배열 복사 가능.
        // 셋 자료형 - 고유한 값들만 뽑아냄. 데이터 중복을 제거하는 자료형
        const gList = [...new Set(g)];
        // 즉 이거는 Set 자료형을 통해서 중복을 제거한 g라는 배열을 펼쳐서 따로 복제한 걸 gList에 넣었다는 뜻임. 걍 새로운 배열을 만든 것임.
        console.log("중복이 제거된 ㅇㅇ구 배열", gList);
        setGu(gList);
    }



    // 자료를 끊임없이 새로고침시키지 말고 그냥 한번만 실행해라
    useEffect(() => {
        getData();
    }, [])

    return (
        <>
            <Header gu={gu} />
            {
                console.log(food)
            }

            {
                console.log(food)
            }

            {/* {

                food.map((it, idx) => {
                    return (
                        <li>{idx + 1} / {it.MAIN_TITLE
                        } / {it.ITEMCNTNTS
                            } / {it.GUGUN_NM
                            } </li>
                    )
                })
            } */}

            {/* foreach는 그냥 순회만 하고, map 은 꺼집어내면서 새로운 배열을 만든다 */}
            {/* {
                TEST.map((it, idx) => {
                    return (
                        <li>{idx + 1} / {it.name} / {it.age} / </li>
                    )
                })
            } */}

            <Routes>
                <Route path="/" element={<AllList food={food} />}></Route>
                <Route path="/:gu" element={<GuList food={food} />}></Route>
                <Route path="/item/:item" element={<Item food={food} />}></Route>


            </Routes>
            <Main />
            <Footer />


        </>

    )
};

export default App;