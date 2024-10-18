import { useState } from "react";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import service from "../services/config";
import { useNavigate } from "react-router-dom";

const DEFAULT_PRODUCT_FORM_VALUES = {
  title: "",
  description: "",
  price: "",
  image: "",
  category: "",
};

function AddProductForm(props) {
  const [product, setProduct] = useState({ ...DEFAULT_PRODUCT_FORM_VALUES });
  const navigate = useNavigate();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: props?.title || "",
    description: props?.description || "",
    price: props?.price || "",
    category: props?.category || "",
  });

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { ...product };

    service
      .post(`/products`, requestBody)
      .then(() => {
        setProduct({ ...DEFAULT_PRODUCT_FORM_VALUES });
        navigate("/");
        window.location.reload("/");
      })
      .catch((error) => console.log(error));
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    const { title, description, price, image, category } = formData;

    const updatedProduct = {
      title,
      description,
      price,
      image,
      category,
    };
    try {
      await service.put(`/products/${props.id}`, updatedProduct);
      navigate(`/${props.id}`);
      window.location.reload(`/${props.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked, options, multiple } = e.target;

    let inputValue = type === "checkbox" ? checked : value;

    if (multiple && options) {
      inputValue = [];
      for (var i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          inputValue.push(options[i].value);
        }
      }
    }

    setProduct((prevproduct) => ({
      ...prevproduct,
      [name]: inputValue,
    }));
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  if (props.type === "add") {
    return (
      <>
        <Button variant="primary" onClick={openModal}>
          Add a product
        </Button>

        <Modal show={modalIsOpen} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add a Product</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Title:</Form.Label>
                <Form.Control
                  name="title"
                  onChange={handleChange}
                  value={product.title}
                  placeholder="Add a title"
                />
                <Form.Text className="text-muted">
                  Add a title to your product
                </Form.Text>
              </Form.Group>

              <Form.Group>
                <Form.Label>Description:</Form.Label>
                <Form.Control
                  name="description"
                  onChange={handleChange}
                  value={product.description}
                  placeholder="Add a description"
                />
                <Form.Text className="text-muted">
                  Add a short description to your product
                </Form.Text>
              </Form.Group>
              <Form.Group>
                <Form.Label>Price:</Form.Label>
                <Form.Control
                  name="price"
                  type="number"
                  onChange={handleChange}
                  value={product.price}
                  placeholder="Add a price"
                />
                <Form.Text className="text-muted">
                  Add a price to your product
                </Form.Text>
              </Form.Group>
              <Form.Group>
                <Form.Label>Category</Form.Label>
                <Form.Select
                  name="category"
                  onChange={handleChange}
                  value={product.category}
                  placeholder="select a category"
                >
                  <option value="-">---</option>
                  <option value="Prints">Prints</option>
                  <option value="Stickers">Stickers</option>
                  <option value="Merchandising">Merchandising</option>
                  <option value="Painting">Painting</option>
                </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Label>Add an URL for an image of your product</Form.Label>
                <Form.Control
                  type="text"
                  name="image"
                  onChange={handleChange}
                  value={product.image}
                />
              </Form.Group>
              <Button type="submit">Add</Button>
              <Button onClick={closeModal} variant="secondary">
                Close
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  } else if (props.type === "edit") {
    return (
      <>
        <Button variant="primary" onClick={openModal}>
          Edit product
        </Button>

        <Modal show={modalIsOpen} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Product</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form onSubmit={handleUpdate}>
              <Form.Group>
                <Form.Label>Title:</Form.Label>
                <Form.Control
                  name="title"
                  onChange={handleChange}
                  value={formData.title}
                  placeholder={props.title}
                />
                <Form.Text className="text-muted">
                  Edit the title of your product
                </Form.Text>
              </Form.Group>

              <Form.Group>
                <Form.Label>Description:</Form.Label>
                <Form.Control
                  name="description"
                  onChange={handleChange}
                  value={formData.description}
                  placeholder={props.description}
                />
                <Form.Text className="text-muted">
                  Edit the short description of your product
                </Form.Text>
              </Form.Group>
              <Form.Group>
                <Form.Label>Price:</Form.Label>
                <Form.Control
                  name="price"
                  type="number"
                  onChange={handleChange}
                  value={formData.price}
                  placeholder={props.price}
                />
                <Form.Text className="text-muted">
                  Edit the price of your product
                </Form.Text>
              </Form.Group>
              <Form.Group>
                <Form.Label>Category</Form.Label>
                <Form.Select
                  name="category"
                  onChange={handleChange}
                  value={formData.category}
                  placeholder="select a category"
                >
                  <option value="-">---</option>
                  <option value="Prints">Prints</option>
                  <option value="Stickers">Stickers</option>
                  <option value="Merchandising">Merchandising</option>
                  <option value="Painting">Painting</option>
                </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Label>
                  Edit the URL for the image of your product
                </Form.Label>
                <Form.Control
                  type="text"
                  name="image"
                  onChange={handleChange}
                  value={formData.image}
                  placeholder={props.image}
                />
              </Form.Group>
              <Button type="submit">Add</Button>
              <Button onClick={closeModal} variant="secondary">
                Close
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default AddProductForm;
