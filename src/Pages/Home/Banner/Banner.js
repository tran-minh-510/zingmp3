import React, { useState, useEffect, useRef } from "react";
import "./Banner.scss";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// import { actionsBanner } from "./sliceBanner";
import { actionsPersistMusic } from "../../../Components/GeneralSlice/sliceMusic";

export default function Banner(props) {
    const refBanner = useRef([]);
    const navigate = useNavigate();
    const { listBanner } = props;
    const dispatch = useDispatch();
    const [elementsBanner, setElementsBanner] = useState([]);
    const numberBlockItems = (start, end, number) => {
        const arr = [];
        let limit = start > end ? number : end;
        for (let i = start; i <= limit; i++) {
            arr.push(i);
        }
        if (start > end) {
            for (let i = 0; i <= end; i++) {
                arr.push(i);
            }
        }
        return arr;
    };
    useEffect(() => {
        let customListBanner = [];
        [...new Set(refBanner.current)].forEach((item) => {
            if (item !== null) customListBanner.push(item);
        });
        if (elementsBanner.length !== customListBanner.length) {
            setElementsBanner(customListBanner);
        }
        if (elementsBanner.length) {
            let min = 0;
            let max = 2;
            const interval = setInterval(() => {
                const arrIndexBlock = numberBlockItems(
                    min,
                    max,
                    elementsBanner.length - 1
                );
                elementsBanner.forEach((items, index) => {
                    if (arrIndexBlock.includes(index)) {
                        items.classList.remove(
                            "hidden",
                            "slide-right",
                            "slide-left",
                            "slide-left2",
                            "order-first",
                            "z-9999",
                            "order-2",
                            "order-last"
                        );
                        if (arrIndexBlock.indexOf(index) === 0) {
                            items.classList.add("order-first", "z-9999", "slide-left");
                        } else if (arrIndexBlock.indexOf(index) === 1) {
                            items.classList.add("order-2", "z-9999", "slide-left2");
                        } else if (arrIndexBlock.indexOf(index) === 2) {
                            items.classList.add("order-last", "slide-right");
                        }
                    } else {
                        items.classList.add("hidden");
                    }
                });
                min = min === elementsBanner.length - 1 ? 0 : (min += 1);
                max = max === elementsBanner.length - 1 ? 0 : (max += 1);
            }, 2000);
            return () => {
                clearInterval(interval);
            };
        }
    });
    return (
        <>
            <div className="banner d-flex gap-4">
                {listBanner?.banner?.map(({ type, banner, encodeId, link }, index) => {
                    return (
                        <div
                            className="card banner-items overflow-hidden hidden"
                            key={index}
                            ref={(item) => refBanner.current.push(item)}
                            onClick={() => {
                                if (type === 1) dispatch(actionsPersistMusic.setIdMusicLocal(encodeId));
                                if (type === 4) navigate(link.slice(0, -5));
                            }}
                        >
                            <img src={banner} className="card-img-top" alt="..." />
                        </div>
                    );
                })}
            </div>
        </>
    );
}
