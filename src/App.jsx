import { useEffect, useState } from "react"
import Prayer from "./component/prayer"


function App() {

const [prayerTimes , serPrayerTimes] = useState({})
const [dateTime , setDateTime] = useState("")
const [city , setCity] = useState("")

  const cities = [
    {name : "القاهرة" , value : "Cairo"},
    {name : "الإسكندرية" , value : "Alexandia"},
    {name : "الجيزة" , value : "Giza"},
    {name : "العريش" , value : "Al Arish"},
    {name : "المنصورة" , value : "Mansoura"},
    {name : "أسوان" , value : "Aswan"},
    {name : "الأقصر" , value : "Luxor"}
  ]


useEffect(() => {
  const fetchPrayerTimes = async () =>{
    try{

      const response = await fetch (`https://api.aladhan.com/v1/timingsByCity/03-09-2024?city=Eg&country=Cairo=${city}`)
      const data_Prayer = await response.json()


      serPrayerTimes(data_Prayer.data.timings)
      setDateTime(data_Prayer.data.date.gregorian.date)


      console.log(data_Prayer.data);

    } catch(error){
      console.error(error)
    }
  }

  fetchPrayerTimes()
},[city])

const formatTimes = (time) => {
  if(!time) {
    return"00:00";
  }

  let [hours , minutes] = time.split(":").map(Number)
  const perd = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  return`${hours}:${minutes < 10 ? "0" + minutes:minutes} ${perd}`
}


  return (
<section>
  <div className="container">
    <div className="top_sec">
      <div className="city">

        <h3>المدينة</h3>

        <select name="" id="" onChange={(e) => setCity(e.target.value)}>
          {cities.map((city_Obj) => (
            <option key={city_Obj.value} value={city_Obj.value}>{city_Obj.name}</option>
          ))}
        </select>
      </div>

      <div className="date">
<h3> التاريخ</h3>
<h4>{dateTime}</h4>
      </div>

    </div>

    <Prayer name="الفجر" time={formatTimes(prayerTimes.Fajr)}/>
    <Prayer name="الظهر" time={formatTimes(prayerTimes.Dhuhr)}/>
    <Prayer name="العصر" time={formatTimes(prayerTimes.Asr)}/>
    <Prayer name="المغرب" time={formatTimes(prayerTimes.Maghrib)}/>
    <Prayer name="العشاء" time={formatTimes(prayerTimes.Isha)}/>
   
  </div>
</section>

  )
}

export default App
 