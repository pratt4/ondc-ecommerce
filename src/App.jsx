import { Fragment } from "react";
import Directory from "./components/directory/directory.component";
import NavBar from "./components/navbar/navbar.component";

function App() {
  const categories=[
    {
      "id": 1,
      "title": "Fruits ",
      "imageUrl": "https://www.englishclub.com/images/vocabulary/food/fruits/fruits.jpg"
    },
    {
      "id": 2,
      "title": "Vegetables",
      "imageUrl": "https://www.healthyeating.org/images/default-source/home-0.0/nutrition-topics-2.0/general-nutrition-wellness/2-2-2-2foodgroups_vegetables_detailfeature.jpg?sfvrsn=226f1bc7_6"
    },
    {
      "id": 3,
      "title": "Drinks and Juices",
      "imageUrl": "https://b1156533.smushcdn.com/1156533/wp-content/uploads/2021/08/soda.jpg?lossy=1&strip=1&webp=1"
    },
    {
      "id": 4,
      "title": "Snacks & Biscuit",
      "imageUrl": "https://www.eatthis.com/wp-content/uploads/sites/4/2020/05/snacks-in-america.jpg?quality=82&strip=1&w=800"
    },
    {
      "id": 5,
      "title": "Dairy & Bread",
      "imageUrl": "https://img.freepik.com/premium-photo/bottle-bread-with-bottle-milk-it_25996-3433.jpg?w=360"
    },
    {
      "id": 6,
      "title": "Chocolate & Icecream",
      "imageUrl": "https://images.indianexpress.com/2021/06/Chocolate-Ice-Cream-The-Westin-Mumbai_759.jpeg"
    }
    
];

  return (
    <Fragment>

    <NavBar/>
    <Directory categories={categories}/>
    </Fragment>
  )  
}

export default App;
