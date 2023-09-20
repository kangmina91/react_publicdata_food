import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Item = ({ food }) => {
    const { item } = useParams();
    const gage = food.find(it => it.MAIN_TITLE == item);

    const { kakao } = window;

    const KakaoMapScript = () => {
        var container = document.getElementById('map');
        var options = {
            center: new kakao.maps.LatLng(gage.LAT, gage.LNG),
            level: 3
        };

        var map = new kakao.maps.Map(container, options);

        // 마커가 표시될 위치입니다 
        var markerPosition = new kakao.maps.LatLng(gage.LAT, gage.LNG);
        var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
        var imageSize = new kakao.maps.Size(24, 35);
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({
            position: markerPosition,
            image: markerImage
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);
    }

    useEffect(() => {
        //맵 api 불러오는 함수
        gage && KakaoMapScript();
    }, [gage])


    return (
        <>
            {
                gage && (
                    <>
                        <h3>{gage.MAIN_TITLE}</h3>
                        <div id="map" style={{ height: '400px' }}></div>
                        <table className="table">
                            <colgroup>
                                <col style={{ width: '100px' }} />
                                <col />
                            </colgroup>
                            <caption className="blind">음식점 설명</caption>
                            <tbody>
                                <tr>
                                    <td>주 소</td>
                                    <td>{gage.ADDR1}</td>
                                </tr>
                                <tr>
                                    <td>연락처</td>
                                    <td><a href={`tel:${gage.CNTCT_TEL}`}>{gage.CNTCT_TEL}</a></td>
                                </tr>
                                <tr>
                                    <td>설 명</td>
                                    <td>{gage.ITEMCNTNTS}</td>
                                </tr>
                            </tbody>
                        </table>
                    </>

                )
            }

        </>
    )
}

export default Item;