import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";

interface IMonth {
  ID: string;
  Title: string;
  ImgURL: string;
  StartTime: string;
  EndTime: string;
  Host: string;
  Type: string;
  Subscribe: number;
  Racing: string;
  Status: number;
}

interface IYear {
  [key: string]: IMonth[];
}

interface IData {
  [key: string]: IYear;
}

const CONTEST_COUNT = 6;

const values = <T extends { [key: string]: IMonth[] }>(obj: T) => {
  return Object.keys(obj)
    .sort((a, b) => Number(b) - Number(a))
    .map(e => {
      // console.log('obj[e]: ', obj[e]);
      return obj[e];
    });
};

enum Status {
  "IN_PROGRESS" = 1,
  "HAVE_NOT_BEGUN" = 2,
  "FINISHED" = 3,
}

const status: { [key: number]: string } = {
  [Status.IN_PROGRESS]: "IN_PROGRESS",
  [Status.HAVE_NOT_BEGUN]: "HAVE_NOT_BEGUN",
  [Status.FINISHED]: "FINISHED",
};

const IconPosition: { [key: string]: string } = {
  HAVE_NOT_BEGUN: "0 0",
  FINISHED: "0 100%",
  IN_PROGRESS: "0 50%",
};

function App() {
  const data: IData = {
    2022: {
      "12": [
        {
          ID: "4",
          Title: "首届天权Megrez网络安全公开赛",
          ImgURL: "tqgks.jpg",
          StartTime: "待定",
          EndTime: "待定",
          Host: "天权信息安全研究中心",
          Type: "线上赛",
          Subscribe: 1,
          Racing: "未开始",
          Status: 2,
        },
      ],
      "09": [
        {
          ID: "jxsaks",
          Title: "2022年“Catf1ag”全国网络安全九小时AK赛",
          ImgURL: "jxsaks.png",
          StartTime: "2022-09-09 9:00:00",
          EndTime: "2022-09-09 17:00:00",
          Host: "Catf1ag",
          Type: "线上赛",
          Subscribe: 1,
          Racing: "未开始",
          Status: 2,
        },
      ],
      "08": [
        {
          ID: "jsjs",
          Title: "2022年长三角生态绿色一体化发展示范区网络安全攻防大赛",
          ImgURL: "jsjs.png",
          StartTime: "2022-08-13 19:00:00",
          EndTime: "2022-08-13 22:00:00",
          Host: "中共苏州市吴江区委网络安全和信息化委员会办公室",
          Type: "线上赛",
          Subscribe: 2,
          Racing: "已结束",
          Status: 3,
        },
      ],
      "07": [
        {
          ID: "zxs",
          Title: "天权“信安杯”网络安全招新赛",
          ImgURL: "zxhb.png",
          StartTime: "2022-07-17 09:00:00",
          EndTime: "2022-07-17 17:00:00",
          Host: "湖南警察学院、天权信息安全研究中心",
          Type: "线上赛",
          Subscribe: 2,
          Racing: "已结束",
          Status: 3,
        },
      ],
      "06": [
        {
          ID: "gsccd",
          Title: "第十五届全国大学生信息安全竞赛-创新实践能力赛（华中赛区）",
          ImgURL: "gsccd.png",
          StartTime: "2022-06-25 09:30:00",
          EndTime: "2022-06-25 17:30:00",
          Host: "中国互联网发展基金会",
          Type: "线上赛",
          Subscribe: 2,
          Racing: "已结束",
          Status: 3,
        },
        {
          ID: "TQCTF",
          Title: "天权Megrez内部攻防演练",
          ImgURL: "tqnbgks.jpg",
          StartTime: "2022-06-12 14:00:00",
          EndTime: "2022-06-12 17:00:00",
          Host: "上海森金信息科技中心",
          Type: "线下赛",
          Subscribe: 2,
          Racing: "已结束",
          Status: 3,
        },
      ],
      "05": [
        {
          ID: "ZZUCTF",
          Title: "郑州大学网安学院CTF招新赛",
          ImgURL: "zdzxs.jpg",
          StartTime: "2022-05-21 09:00:00",
          EndTime: "2022-05-22 21:00:00",
          Host: "郑州大学网络空间安全学院",
          Type: "线上赛",
          Subscribe: 2,
          Racing: "已结束",
          Status: 3,
        },
        {
          ID: "whtcc",
          Title: "第17届技能节“艾迪飞”杯",
          ImgURL: "wjadfb.jpg",
          StartTime: "2022-05-08 09:00:00",
          EndTime: "2022-05-08 17:00:00",
          Host: "武汉交通职业学院",
          Type: "线上赛",
          Subscribe: 2,
          Racing: "已结束",
          Status: 3,
        },
      ],
    },
  };

  const calendarLine = Object.keys(data)
    .sort((a, b) => Number(b) - Number(a))
    .map(item => {
      const months = Object.keys(data[item]).map(month => {
        return {
          months: month,
        };
      });
      const yearList = {
        years: item,
        months: Object.keys(data[item]).sort((a, b) => Number(b) - Number(a)),
      };
      return yearList;
    });
  // console.log('calendarLine: ', calendarLine);

  const [isMoreVisible, setIsMoreVisible] = useState(false);
  const [currentYear, setCurrentYear] = useState("2022");
  const [currentMonth, setCurrentMonth] = useState(
    String(new Date().getMonth() + 1).padStart(2, "0")
  );
  const [currentContestList, setCurrentContestList] = useState(
    data[currentYear][currentMonth] || []
  );

  const handleClick = (year: string, month?: string) => {
    setCurrentYear(year);
    setCurrentMonth(month || "");
    // console.log('handledData: ', handledData);
    const clickedData = month ? data[year][month] : values(data[year]).flat();
    const offset =
      currentContestList.length >= 10 ? currentContestList.length + 10 : 10;
    if (clickedData.length >= 10) {
      if (clickedData.length >= offset) {
        setIsMoreVisible(true);
      } else {
        setIsMoreVisible(false);
      }
      // console.log('offset: ', offset);
      setCurrentContestList(clickedData.slice(0, offset));
      // console.log('clickedData: ', clickedData, clickedData.slice(0, offset));
      return;
    }
    setCurrentContestList(clickedData);
  };
  // useEffect(() => {
  //   setCurrentContestList(data[currentYear][currentMonth])
  // }, [currentYear, currentMonth])

  return (
    <div>
      <video autoPlay muted loop playsInline preload="auto">
        <source
          src={new URL(`./assets/video/night.mp4`, import.meta.url).href}
          type="video/mp4"
        ></source>
      </video>
      <div className="title"></div>
      <div className="border_head">
        已成功举办<span className="border_head_number">{CONTEST_COUNT}</span>
        场网络安全竞赛
        <div className="border_head_go_link">
          <a href="https://www.wjx.top/vj/PNrRK6F.aspx" target="_blank">
            {`我要举办比赛 -->-->-->`}
          </a>
        </div>
      </div>
      <div className="container">
        <div className="calendar_line" id="calendar_line">
          <div className="calendar_line_container">
            {calendarLine.map((item, index) => {
              return (
                <div
                  className="calendar_line_list"
                  key={item.years}
                  onClick={() => handleClick(item.years)}
                >
                  <div
                    className={`calendar_line_year ${
                      item.years === currentYear ? "active" : ""
                    }`}
                  >
                    {item.years}年
                  </div>
                  {item.years === currentYear && (
                    <ul>
                      {item.months.map((month, index) => {
                        return (
                          <li
                            className={`calendar_line_month ${
                              month === currentMonth ? "active" : ""
                            }`}
                            key={month}
                            onClick={e => {
                              e.stopPropagation();
                              handleClick(item.years, month);
                            }}
                          >
                            {month}月
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <ul className="contest_list" id="contest_list">
          {currentContestList.map((item, index) => {
            return (
              <li className="contest_detail" key={index}>
                <div className="contest_img">
                  <a href="#">
                    <div className="contest_img_detail">
                      <div
                        className="contest_status"
                        style={{
                          backgroundPosition: `${
                            IconPosition[status[item.Status]] || "0 0"
                          }`,
                        }}
                      ></div>
                      <img
                        src={
                          new URL(
                            `./assets/images/${item.ImgURL}`,
                            import.meta.url
                          ).href
                        }
                        alt="预览图"
                      />
                    </div>
                  </a>
                </div>
                <div className="contest_text">
                  <a href="#">
                    <h2>{item.Title}</h2>
                  </a>
                  <h3>
                    <span>主办方：</span>
                    <span>{item.Host}</span>
                  </h3>
                  <h3>
                    <span>比赛模式：</span>
                    <span>{item.Type}</span>
                  </h3>
                  <h3>
                    <span>比赛时间：</span>
                    <span>
                      {item.StartTime} - {item.EndTime}
                    </span>
                  </h3>
                  <a
                    href={`https://www.megrezsec.cn/${item.ID}.html`}
                    target="_blank"
                  >
                    <button className="btn-orange" style={{ marginTop: 8 }}>
                      查看详情
                    </button>
                  </a>
                </div>
              </li>
            );
          })}
          {isMoreVisible ? (
            <button
              className="btn-orange btn-more"
              onClick={() => handleClick(currentYear)}
            >
              加载更多
            </button>
          ) : null}
        </ul>
      </div>
      <div className="footer">
        <a href="https://beian.miit.gov.cn" target="_blank">
          苏 ICP 备 2022003021 号-2
        </a>
      </div>
    </div>
  );
}

export default App;
