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
            level: 2
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
            image: markerImage,
            clickable: true // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);

        var iwContent = `<div style="text-align:center; padding:5px; width:150px;"><a href="https://map.kakao.com/link/to/${gage.MAIN_TITLE},${gage.LAT},${gage.LNG}" style="color:black;" target="_blank">${gage.MAIN_TITLE}</a></div>`// 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다


        // 인포윈도우를 생성합니다
        var infowindow = new kakao.maps.InfoWindow({
            content: iwContent,
        });


        // 마커 위에 인포윈도우를 표시합니다
        infowindow.open(map, marker);
    }

    useEffect(() => {
        //맵 api 불러오는 함수
        gage && KakaoMapScript();
    }, [gage])


    return (
        <article className="item_des">
            {
                gage && (

                    <div className="inner">
                        <h3>{gage.MAIN_TITLE}</h3>
                        <div className="img_box">
                            <img src={gage.MAIN_IMG_NORMAL} alt={gage.MAIN_TITLE} />
                        </div>
                        <div className="content">

                            <div id="map" style={{ height: '200px' }}></div>
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
                                        <td className="last">설 명</td>
                                        <td className="last">{gage.ITEMCNTNTS}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                )
            }

        </article>
    )
}

export default Item;