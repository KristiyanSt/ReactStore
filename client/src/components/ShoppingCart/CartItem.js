import { Button, Stack } from "react-bootstrap"
import styles from './CartItem.module.css'

export default function CartItem({ product, quantity, removeFromCart }) {

    if(!product) {
        return null;
    }
    
    return <>
        <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
            <img
                src={product.imageUrl}
                className={styles.img}
            />
            <div className="me-auto">
                {product.name}{" "}
                {quantity > 1 &&
                    <span className="text-muted">
                        x{quantity}
                    </span>
                }
                <div className="text-muted">
                    ${product.price}
                </div>
            </div>
            <div>
                ${Number(product.price) * quantity}
            </div>
            <Button
                variant="outline-danger"
                onClick={() => removeFromCart(product._id)}
            >&times;
            </Button>

        </Stack>
    </>
}