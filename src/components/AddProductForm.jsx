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
const DEFAULT_USER_FORM_VALUES = {
  username: "",
  email: "",
  firstName: "",
  lastName: "",
  address: "",
  image: "",
};

function AddProductForm(props) {
  const [product, setProduct] = useState({ ...DEFAULT_PRODUCT_FORM_VALUES });
  const [user, setUser] = useState({ ...DEFAULT_USER_FORM_VALUES });
  const navigate = useNavigate();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: props?.title || "",
    description: props?.description || "",
    price: props?.price || "",
    category: props?.category || "",
  });
  const [userFormData, setUserFormData] = useState({
    username: props?.username || "",
    email: props?.email || "",
    firstName: props?.firstName || "",
    lastName: props?.lastName || "",
    address: props?.address || "",
    image: props?.image || "",
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
  const handleUserUpdate = async (e) => {
    e.preventDefault();
    const { username, email, firstName, lastName, address, image } =
      userFormData;

    const updatedUser = {
      username,
      email,
      firstName,
      lastName,
      address,
      image,
    };
    try {
      await service.patch(`/users/${props.id}`, updatedUser);
      window.location.reload();
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
    setUser((prevuser) => ({
      ...prevuser,
      [name]: inputValue,
    }));
    setUserFormData({
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
                  required
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
                  required
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
                  required
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
                  required
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
                  placeholder="Image Url"
                  required
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
                  placeholder="Add a title"
                  required
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
                  placeholder="Add a descritpion"
                  required
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
                  placeholder="Add a price"
                  required
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
                  required
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
                  placeholder="Image Url"
                  required
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
  } else if (props.type === "edit user") {
    return (
      <>
        <Button variant="primary" onClick={openModal}>
          Edit User Details
        </Button>

        <Modal show={modalIsOpen} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit User Details</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form onSubmit={handleUserUpdate}>
              <Form.Group>
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  name="username"
                  onChange={handleChange}
                  value={userFormData.username}
                  placeholder="Add a Username"
                  required
                />
                <Form.Text className="text-muted">Edit your username</Form.Text>
              </Form.Group>

              <Form.Group>
                <Form.Label>email:</Form.Label>
                <Form.Control
                  name="email"
                  onChange={handleChange}
                  value={userFormData.email}
                  placeholder="add your email"
                  required
                />
                <Form.Text className="text-muted">Edit your email</Form.Text>
              </Form.Group>

              <Form.Group>
                <Form.Label>First Name:</Form.Label>
                <Form.Control
                  name="firstName"
                  type="text"
                  onChange={handleChange}
                  value={userFormData.firstName}
                  placeholder="Add a name"
                />
                <Form.Text className="text-muted">Edit your name</Form.Text>
              </Form.Group>

              <Form.Group>
                <Form.Label>Last Name:</Form.Label>
                <Form.Control
                  name="lastName"
                  type="text"
                  onChange={handleChange}
                  value={userFormData.lastName}
                  placeholder="Add a surname"
                />
                <Form.Text className="text-muted">Edit your surname</Form.Text>
              </Form.Group>

              <Form.Group>
                <Form.Label>Address:</Form.Label>
                <Form.Control
                  name="adress"
                  type="text"
                  onChange={handleChange}
                  value={userFormData.address}
                  placeholder="Add a profile picture"
                />
                <Form.Text className="text-muted">Edit your PFP</Form.Text>
              </Form.Group>

              <Form.Group>
                <Form.Label>Edit the URL for the image of your PFP</Form.Label>
                <Form.Control
                  type="text"
                  name="image"
                  onChange={handleChange}
                  value={userFormData.image}
                  placeholder="Image Url"
                  required
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
