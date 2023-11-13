import { Button, Card, Stack } from "react-bootstrap";

export default function CartItem({ product,quantity, removeFromCart }) {

    return <>
        <Stack direaction="horizontal" gap={2}>
            <img 
                src={product.imageUrl}
                style={{width: '125px', height: '95px'}} />

        </Stack>

        {/* // <Card style={{ width: '8rem', margin: "20px", display: "inline-block" }}>
        //     <Card.Img variant="top" src={product.imageUrl} />
        //     <Card.Body>
        //         <Card.Title>{product.name}</Card.Title>
        //         <Card.Text>
        //             Price: ${Number(product.price) * Number(product.quantity)} x {quantity}
        //         </Card.Text>
        //         <Button onClick={() => removeFromCart(product._id)} 
        //         variant="danger">Remove</Button>
        //     </Card.Body>
        // </Card> */}
    </>
}