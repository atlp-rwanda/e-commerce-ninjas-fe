/* eslint-disable @typescript-eslint/indent */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/jsx-key */
/* eslint-disable arrow-parens */
/* eslint-disable arrow-spacing */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-indent */
import React from 'react'

const CardHeader = ({ title }: { title: string }) => {
    return (<h1>{title}</h1>)
}

const Product = () => {
    const mainImage = 'http://localhost:5000/assets/0.png';
    const images = ['http://localhost:5000/assets/1.png', 'http://localhost:5000/assets/2.png', 'http://localhost:5000/assets/3.png', 'http://localhost:5000/assets/4.png', 'http://localhost:5000/assets/5.png'];
    return (
        <div>
            <div className="header">
                <div className="images">
                    {images.map(image => <img src={image} alt="product-image" />)}
                </div>
                <div className="main-image"><img src={mainImage} alt="main-image" /></div>
                <div className="details">
                    <h1>New 4G S8 Ultra Smart Watch Ultra Series 8 Google APP WiFi Smart Watch For Men Women Original BT Call Sports Watch</h1>
                </div>
            </div>
            <div className="description">
                <CardHeader title="Product Details" />
                <div className="">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam dicta impedit maxime neque ex ullam deserunt assumenda nostrum nemo repellendus ad provident aliquam, blanditiis distinctio error, modi iusto? In omnis, amet ipsum exercitationem ducimus nostrum? Quidem doloremque, incidunt commodi deleniti, illo, obcaecati omnis non magnam error dolore assumenda eos. Hic quaerat placeat tempore sed odit odio illum ipsa atque! Ipsa natus perferendis voluptatibus reprehenderit est libero illum, architecto aut eos voluptas, nihil quos voluptatem error. Nihil consequatur ut adipisci libero animi alias. Architecto exercitationem reprehenderit praesentium excepturi iure in nobis, optio repellat id sequi laborum cupiditate deleniti odit labore vitae placeat necessitatibus. Debitis architecto quisquam saepe nisi? Autem repellat eligendi enim, ipsa qui obcaecati odit rem amet in sunt tempore veritatis excepturi vero quidem asperiores corporis mollitia nisi cupiditate! Ipsa doloremque suscipit qui dicta vel enim. Aperiam maxime dolore cupiditate. Recusandae magni unde odit inventore doloribus velit fugiat accusamus, mollitia laboriosam neque officia id sit dignissimos consectetur illum. Dicta voluptatibus quod maxime eos dolores veritatis deleniti soluta iste sunt ullam aliquid distinctio, qui sequi unde tempora quaerat iusto iure explicabo vel, rem impedit tempore debitis adipisci. Laboriosam labore velit dolore inventore dolor iure eligendi ipsum, eum, repudiandae omnis, veritatis possimus eveniet provident debitis libero alias. Laborum eveniet veniam, quia libero officiis consequuntur aliquam modi possimus, distinctio perferendis nemo adipisci unde cupiditate! Ipsum ad inventore iste odit id blanditiis rem facilis quis similique quam delectus placeat voluptatem saepe magnam, dolor obcaecati qui nisi iure voluptatibus, rerum deleniti et cupiditate sapiente! Necessitatibus, aperiam. Voluptatibus eius perferendis cupiditate? Voluptates soluta blanditiis nemo neque! Delectus tenetur est officiis qui cupiditate quam modi omnis iure dolorum non rem voluptatem esse quos, suscipit, quod unde deleniti temporibus vel recusandae repellendus? Quod corporis eligendi at dolorum sint deleniti in, ad esse pariatur dignissimos laudantium architecto facilis distinctio?
                </div>
            </div>
        </div>
    )
}

export default Product
