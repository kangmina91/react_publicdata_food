import { useEffect } from "react";
import { Link } from "react-router-dom";

const AllList = ({ food }) => {
    const { kakao } = window;

    const KakaoMapScript = () => {
        var mapContainer = document.getElementById('map'), // 지도를 표시할 div  
            mapOption = {
                center: new kakao.maps.LatLng(food[20]?.LAT, food[20]?.LNG), // 지도의 중심좌표
                level: 7 // 지도의 확대 레벨
            };

        //var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

        var map = new kakao.maps.Map(document.getElementById('map'), { // 지도를 표시할 div
            center: new kakao.maps.LatLng(food[20]?.LAT, food[20]?.LNG), // 지도의 중심좌표 
            level: 10 // 지도의 확대 레벨 
        });

        // 마커 클러스터러를 생성합니다 
        var clusterer = new kakao.maps.MarkerClusterer({
            map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체 
            averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정 
            minLevel: 10 // 클러스터 할 최소 지도 레벨 
        });

        // 마커를 표시할 위치와 title 객체 배열입니다 
        var markers = food.map((it, idx) => {
            console.log(it, idx, it.LAT, it.LNG)
            return new kakao.maps.Marker({
                position: new kakao.maps.LatLng(it.LAT, it.LNG)
            });
        });

        console.log(markers)


        clusterer.addMarkers(markers);


        // var markers = $(data.positions).map(function(i, position) {
        //     return new kakao.maps.Marker({
        //         position : new kakao.maps.LatLng(position.lat, position.lng)
        //     });
        // });

        // 마커 이미지의 이미지 주소입니다
        var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

        // for (var i = 0; i < positions.length; i++) {

        //     // 마커 이미지의 이미지 크기 입니다
        //     //var imageSize = new kakao.maps.Size(24, 35);

        //     // 마커 이미지를 생성합니다    
        //     // var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

        //     // 마커를 생성합니다
        //     // var marker = new kakao.maps.Marker({
        //     //     map: map, // 마커를 표시할 지도
        //     //     position: positions[i].latlng, // 마커를 표시할 위치
        //     //     title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        //     //     image: markerImage // 마커 이미지 
        //     // });





        // }

        // var xhr = new XMLHttpRequest();
        // xhr.open("GET", "http://apis.data.go.kr/6260000/FoodService/getFoodKr", true);
        // xhr.onreadystatechange = function() {
        //     if (xhr.readyState === 4 && xhr.status === 200) {
        //         var data = JSON.parse(xhr.responseText);

        //         // 데이터에서 좌표 값을 가지고 마커를 표시합니다
        //         // 마커 클러스터러로 관리할 마커 객체는 생성할 때 지도 객체를 설정하지 않습니다
        //         var markers = data.positions.map(function(position) {
        //             return new kakao.maps.Marker({
        //                 position: new kakao.maps.LatLng(position.lat, position.lng)
        //             });
        //         });

        //         // 클러스터러에 마커들을 추가합니다
        //         clusterer.addMarkers(markers);
        //     }
        // };
        // xhr.send();
    }

    useEffect(() => {
        food && KakaoMapScript();
    }, [food])
    return (
        <section className="AllList sec">

            <div id="map" style={{ height: '650px' }}></div>
            <div className="inner">
                <ul className="list">
                    {
                        food.map(it => {
                            return (
                                <li key={it.UC_SEQ}>
                                    <Link to={`/item/${it.MAIN_TITLE}`}>
                                        <strong>{it.MAIN_TITLE}</strong>
                                        <div className="img_box">
                                            <img src={it.MAIN_IMG_NORMAL} alt={it.MAIN_TITLE} />
                                        </div>
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>

        </section>
    )
}

export default AllList;