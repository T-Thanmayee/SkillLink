import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom'
import './App.css';
import RootLayout from './RootLayout'
import {lazy, Suspense} from 'react'
import Home from './components/home/Home';
import Signup from './components/signup/Signup';
import Signin from './components/signin/Signin';
import UserProfile from './components/user-profile/UserProfile';
import AuthorProfile from './components/author-profile/AuthorProfile'
import Articles from './components/articles/Articles';


//import AddArticle from './components/add-article/AddArticle';
import ArticlesByAuthor from './components/articles-by-author/ArticlesByAuthor';
import Article from './components/article/Article';
import ErrorPage from './components/ErrorPage';
//dynamic import of Articles
//const Articles=lazy(()=>import('./components/articles/Articles'))
const AddArticle=lazy(()=>import('./components/add-article/AddArticle'))
function App() {

  const browserRouter=createBrowserRouter([{
    path:'',
    element:<RootLayout />,
    errorElement:<ErrorPage />,
    children:[
      {
        path:'',
        element:<Home />
      },
      {
        path:'/signup',
        element:<Signup />
      },
      {
        path:"/signin",
        element:<Signin />
      },
      {
        path:"/user-profile",
        element:<UserProfile />,
        children:[
          {
            path:"articles",
            element:<Articles />
          },
          {
            path:"article/:articleId",
            element:<Article />
          },
          {
            path:'',
            element:<Navigate to='articles' />
          }
        ]
      },
      {
        path:"/author-profile",
        element:<AuthorProfile />,
        children:[
          {
            path:'new-article',
            element:<Suspense fallback="loading..."><AddArticle /></Suspense> 
          },
          {
            path:'articles-by-author/:author',
            element:<ArticlesByAuthor />,
           
          },
          {
            path:"article/:articleId",
            element:<Article />
          },
          {
            path:'',
            element:<Navigate to='articles-by-author/:author' />
          }
        ]
      }
    ]
  }])

  return (
    <div>
      <RouterProvider router={browserRouter} />
    </div>
  );
}

export default App;





//WAD 13 weather


// src/App.js
// src/App.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import { Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// function App() {
//   const [city, setCity] = useState('');
//   const [weatherData, setWeatherData] = useState([]);
//   const [error, setError] = useState('');

//   const fetchWeather = async () => {
//     try {
//       const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=f8ede3aa53451c66175f1ba7774c55bf&units=metric`);
//       const data = response.data.list.map(item => ({
//         date: item.dt_txt,
//         temp: item.main.temp
//       }));
//       setWeatherData(data);
//       setError('');
//     } catch (err) {
//       setError('City not found');
//       setWeatherData([]);
//     }
//   };

//   const handleChange = (e) => {
//     setCity(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     fetchWeather();
//   };

//   const chartData = {
//     labels: weatherData.map(item => item.date),
//     datasets: [
//       {
//         label: 'Temperature (°C)',
//         data: weatherData.map(item => item.temp),
//         fill: false,
//         borderColor: 'rgba(75,192,192,1)',
//         tension: 0.1
//       }
//     ]
//   };

//   const styles = {
//     container: {
//       textAlign: 'center',
//       fontFamily: 'Arial, sans-serif',
//     },
//     form: {
//       margin: '20px 0',
//     },
//     input: {
//       padding: '10px',
//       fontSize: '16px',
//       borderRadius: '4px',
//       border: '1px solid #ccc',
//       marginRight: '10px',
//     },
//     button: {
//       padding: '10px 15px',
//       fontSize: '16px',
//       borderRadius: '4px',
//       border: 'none',
//       backgroundColor: '#28a745',
//       color: '#fff',
//       cursor: 'pointer',
//     },
//     error: {
//       color: 'red',
//     },
//     chartContainer: {
//       marginTop: '20px',
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h1>Weather App</h1>
//       <form style={styles.form} onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={city}
//           onChange={handleChange}
//           placeholder="Enter city"
//           style={styles.input}
//         />
//         <button type="submit" style={styles.button}>Get Weather</button>
//       </form>
//       {error && <p style={styles.error}>{error}</p>}
//       {weatherData.length > 0 && (
//         <div style={styles.chartContainer}>
//           <h2>Temperature in {city}</h2>
//           <Line data={chartData} />
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;
