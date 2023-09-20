import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const GuList = ({ food }) => {
    const { gu } = useParams();
    const guList = food.filter(it => it.GUGUN_NM == gu);
    console.log(guList);

    const { kakao } = window;

    const KakaoMapScript = () => {
        var mapContainer = document.getElementById('map'), // 지도를 표시할 div  
            mapOption = {
                center: new kakao.maps.LatLng(guList[0]?.LAT, guList[0]?.LNG), // 지도의 중심좌표
                level: 4 // 지도의 확대 레벨
            };

        var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

        // 마커를 표시할 위치와 title 객체 배열입니다 
        var positions = guList.map(it => {
            return {
                title: it.TITLE,
                latlng: new kakao.maps.LatLng(it.LAT, it.LNG),
            }
        });

        // 마커 이미지의 이미지 주소입니다
        var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

        for (var i = 0; i < positions.length; i++) {

            // 마커 이미지의 이미지 크기 입니다
            var imageSize = new kakao.maps.Size(24, 35);

            // 마커 이미지를 생성합니다    
            var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

            // 마커를 생성합니다
            var marker = new kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: positions[i].latlng, // 마커를 표시할 위치
                title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                image: markerImage, // 마커 이미지 
                clickable: true // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
            });
            marker.setMap(map);

            var iwContent = `<div style="text-align:center; padding:5px; width:150px;"><a href="https://map.kakao.com/link/to/${positions[i].title},${positions[i].latlng.getLat()},${positions[i].latlng.getLng()}" style="color:black;" target="_blank">${positions[i].title}</a></div>`// 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다


            // 인포윈도우를 생성합니다
            var infowindow = new kakao.maps.InfoWindow({
                content: iwContent,
            });


            // 마커 위에 인포윈도우를 표시합니다
            infowindow.open(map, marker);



        }
    }

    useEffect(() => {
        //맵 api 불러오는 함수
        food && KakaoMapScript();
    }, [food, guList])

    return (
        <section className="MainGuMapSection">
            <div className="inner">
                <h2>{gu} 맛집 리스트</h2>
                <div id="map" style={{ height: '400px' }}></div>
                <ul className="list gu">
                    {
                        guList.map(it => {
                            return (
                                <li key={it.UC_SEQ}>
                                    <Link to={`/item/${it.MAIN_TITLE}`}>
                                        <strong>{it.MAIN_TITLE}</strong>
                                        <div className="img_box">
                                            <img src={it.MAIN_IMG_NORMAL} alt={it.MAIN_TITLE} />
                                        </div>

                                    </Link>
                                    <table className="table">
                                        <colgroup>
                                            <col style={{ width: '100px' }} />
                                            <col />
                                        </colgroup>
                                        <caption className="blind">음식점 설명</caption>
                                        <tbody>
                                            <tr>
                                                <td>주 소</td>
                                                <td>{it.ADDR1}</td>
                                            </tr>
                                            <tr>
                                                <td>연락처</td>
                                                <td><a href={`tel:${it.CNTCT_TEL}`}>{it.CNTCT_TEL}</a></td>
                                            </tr>
                                            <tr>
                                                <td>설 명</td>
                                                <td>{it.ITEMCNTNTS}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>

        </section>
    )
}

export default GuList;