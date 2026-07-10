import React, { useState, useEffect } from 'react'
import sbox from '../../assets/sbox.jpg'
import ubox from '../../assets/ubox.jpg'

const InfoCard = ({ title, value }) => {
  return (
    <div>
      <div className="bg-slate-300 rounded-lg text-center font-medium">
        {title}
      </div>
      <div className="bg-slate-50 p-1 rounded-lg mt-2 text-sm font-bold">
        {value}
      </div>
    </div>
  )
}

const Lintasan = ({ namaLintasan, children }) => {
  const [latestData, setLatestData] = useState(null)
  const [logData, setLogData] = useState([]) // Menyimpan data posisi khusus lintasan aktif
  const [isTracking, setIsTracking] = useState(false)

  // Fungsi untuk mengambil data terbaru dari backend
  const fetchData = () => {
    fetch("https://kki-back.onrender.com/api/data")
      .then((res) => res.json())
      .then((data) => {
        if (data.latest) {
          setLatestData(data.latest)
          
          // Memasukkan data baru ke baris paling atas tabel secara berkala
          setLogData((prevLogs) => {
            // Validasi agar data dengan ID yang sama tidak duplikat di dalam tabel
            const isExist = prevLogs.some(log => log._id === data.latest._id);
            if (isExist) return prevLogs;
            
            // Masukkan data baru di awal array (indeks 0)
            return [data.latest, ...prevLogs];
          })
        }
      })
      .catch((err) => {
        console.error("Server backend tidak berjalan atau error:", err.message)
      })
  }

  // Handler saat tombol Start / Stop ditekan
  const handleToggleTracking = () => {
    if (!isTracking) {
      // Jika baru mau START: Reset tabel log posisi agar bersih dari lintasan sebelumnya
      setLogData([])
      setLatestData(null)
    }
    setIsTracking(!isTracking)
  }

  // Effect untuk interval re-fetch data 1 detik sekali
  useEffect(() => {
    let interval = null
    if (isTracking) {
      fetchData() 
      interval = setInterval(() => {
        fetchData()
      }, 1000)
    } else {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isTracking])

  // Pemetaan Data untuk Geo-Tag Info
  const items = [
    { title: 'DAY', value: latestData ? latestData.day : '-' },
    { title: 'DATE', value: latestData ? latestData.date : '-' },
    { title: 'TIME', value: latestData ? latestData.time : '-' },
    { title: 'POSITION LOG [X,Y]', value: latestData ? `[${latestData.x.toFixed(2)}, ${latestData.y.toFixed(2)}]` : '-' },
    { title: 'SOG [KNOT]', value: latestData ? latestData.sog_knot.toFixed(2) : '-' },
    { title: 'SOG [KM/H]', value: latestData ? latestData.sog_kmh.toFixed(2) : '-' },
    { title: 'COORDINATE', value: latestData ? latestData.coordinate.toFixed(2) : '-' },
    { title: 'COG', value: latestData ? latestData.cog.toFixed(2) : '-' },
  ]

  return (
    <div className="min-h-screen bg-slate-50 w-full p-5">
      
      <h1 className='text-4xl font-bold text-black text-center mb-2'>
        {namaLintasan}
      </h1>

      {/* TOMBOL TRIGGER START / STOP */}
      <div className="flex justify-center mb-6">
        <button
          onClick={handleToggleTracking}
          className={`px-8 py-3 rounded-lg font-bold text-white shadow-md transition-all duration-300 ${
            isTracking 
              ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {isTracking ? 'STOP LINTASAN' : 'START'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-6 ">
        
        {/* geo tag info */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4 bg-blue-500 text-white py-3 rounded-lg text-center w-full">
            Geo - Tag Info </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {items.map((item, index) => (
              <InfoCard key={index} title={item.title} value={item.value} />
            ))}
          </div>
            
          {/* image */}
          <div>
            <h2 className="text-xl font-semibold mb-4 mt-4 bg-blue-500 text-white py-3 rounded-lg text-center w-full">
              IMAGE
            </h2>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex flex-col">
                <div className="flex-1">
                  <img src={sbox} alt="Surface Box" className="w-full h-80 object-contain bg-slate-100 rounded-lg" />
                </div>
                <h3 className="text-center bg-slate-200 rounded-lg py-2 font-semibold mt-2">Surface</h3>
              </div>

              <div className="flex flex-col">
                <div className="flex-1">
                  <img src={ubox} alt="Underwater Box" className="w-full h-80 object-contain bg-slate-100 rounded-lg" />
                </div>
                <h3 className="text-center bg-slate-200 rounded-lg py-2 font-semibold mt-2">Underwater</h3>
              </div>
            </div>
          </div>

          {/* position log */}
          <h2 className="text-xl font-semibold mb-4 mt-4 bg-blue-500 text-white py-3 rounded-lg text-center w-full">
              POSITION LOG
          </h2>
          <div className="overflow-x-auto max-h-[250px] border border-slate-200 rounded-lg shadow-sm mt-4">
            <table className="min-w-full bg-white text-left border-collapse">
              <thead className="bg-slate-100 text-slate-600 text-xs font-semibold uppercase sticky top-0 border-b border-slate-200 z-10">
                <tr>
                  <th className="px-3 py-2.5">TIME</th>
                  <th className="px-3 py-2.5">POSITION [X,Y]</th>
                  <th className="px-3 py-2.5">SOG [KNOT]</th>
                  <th className="px-3 py-2.5">SOG [KM/H]</th>
                  <th className="px-3 py-2.5">COORDINATE</th>
                  <th className="px-3 py-2.5">COG</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-[11px] text-slate-700">
                  {logData.length > 0 ? (
                    logData.map((log, index) => (
                      <tr key={index} className="hover:bg-slate-50 transition-colors">
                        <td className="px-3 py-2">{log.time}</td>
                        <td className="px-3 py-2">[{log.x?.toFixed(1)}, {log.y?.toFixed(1)}]</td>
                        <td className="px-3 py-2">{log.sog_knot?.toFixed(2)}</td>
                        <td className="px-3 py-2">{log.sog_kmh?.toFixed(2)}</td>
                        <td className="px-3 py-2">{log.coordinate?.toFixed(2)}</td>
                        <td className="px-3 py-2">{log.cog?.toFixed(2)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-4 text-slate-400">
                        {isTracking ? "Menunggu data lintasan baru..." : "Tekan START untuk merekam lintasan"}
                      </td>
                    </tr>
                  )}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* trajectory */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4 bg-blue-500 text-white py-3 rounded-lg text-center w-full">
            TRAJECTORY
          </h2>
          <div className="mt-4 flex justify-center">
            {children}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Lintasan
