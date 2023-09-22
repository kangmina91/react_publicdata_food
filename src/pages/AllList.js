import { useEffect } from "react";
import { Link } from "react-router-dom";

const AllList = ({ food }) => {
    const { kakao } = window;

    const KakaoMapScript = () => {


        var map = new kakao.maps.Map(document.getElementById('map'), { // 지도를 표시할 div
            center: new kakao.maps.LatLng(food[20]?.LAT, food[20]?.LNG), // 지도의 중심좌표 
            level: 10 // 지도의 확대 레벨 
        });


        // 마커 이미지의 이미지 주소입니다
        var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

        // 마커 클러스터러를 생성합니다 
        var clusterer = new kakao.maps.MarkerClusterer({
            map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체 
            averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정 
            minLevel: 8 // 클러스터 할 최소 지도 레벨 
        });

        // 마커를 표시할 위치와 title 객체 배열입니다.
        // position은 kakao에서 정해준 객체임
        var markers = food.map((it, idx) => {
            console.log(it, idx, it.LAT, it.LNG)
            return new kakao.maps.Marker({
                position: new kakao.maps.LatLng(it.LAT, it.LNG),
            });
        });

        console.log(markers)
        clusterer.addMarkers(markers);


    }

    useEffect(() => {
        food && KakaoMapScript();
    }, [food])

    return (
        <section className="AllList sec">


            <div className="inner">
                <h2>부산 맛집 리스트</h2>
                <div id="map" style={{ height: '500px' }}></div>
                <ul className="list allgu">
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