import { useState } from "react";

const DEFAULT_PRODUCT_FORM_VALUES = {
  title: "",
  description: "",
  price: "",
  image: "",
  category: "",
};

function AddProductForm({ callback, closeCallback }) {
  const [product, setProduct] = useState({ ...DEFAULT_PRODUCT_FORM_VALUES });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { ...product };

    setSubmitting(true);

    service
      .post(`products`, requestBody)
      .then(() => {
        setProduct({ ...DEFAULT_PRODUCT_FORM_VALUES });
        setSubmitting(false);
        callback();
      })
      .catch((error) => console.log(error));
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
  };

  return (
    <div className="Addproduct bg-white-100 p-8 pb-4 rounded-lg shadow-md flex flex-col h-[100vh] relative  w-full max-w-3xl mx-auto">
      <div className="flex justify-center bg-white items-center mb-4 absolute top-0 left-0 right-0 py-2 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 border-b border-gray-300 shadow-sm"></div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-2 overflow-y-auto mt-12 px-4"
      >
        <h3 className="text-xl mt-4 mb-4 sticky left-0">Add product</h3>
        <div className="flex flex-col mb-2">
          <label className="mb-1 font-medium">
            <title></title>:
          </label>
          <input
            type="text"
            name="title"
            value={product.title}
            onChange={handleChange}
            disabled={submitting}
            className="w-full border border-gray-300 bg-gray-50 p-2 rounded shadow-sm focus:ring-2 focus:ring-blue-200 focus:z-10 transform transition-transform duration-200 focus:translate-y-[-1px]"
          />
        </div>

        <div className="flex flex-col mb-2">
          <label className="mb-1 font-medium">description:</label>
          <input
            type="text"
            name="description"
            value={product.description}
            onChange={handleChange}
            disabled={submitting}
            className="w-full border border-gray-300 bg-gray-50 p-2 rounded shadow-sm focus:ring-2 focus:ring-blue-200 focus:z-10 transform transition-transform duration-200 focus:translate-y-[-1px]"
          />
        </div>

        <div className="flex flex-col mb-2">
          <label className="mb-1 font-medium">price:</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            disabled={submitting}
            className="w-full border border-gray-300 bg-gray-50 p-2 rounded shadow-sm focus:ring-2 focus:ring-blue-200 focus:z-10 transform transition-transform duration-200 focus:translate-y-[-1px]"
          />
        </div>

        <div className="flex flex-col mb-2">
          <label className="mb-1 font-medium">category:</label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            multiple
            disabled={submitting}
            className="w-full border border-gray-300 bg-gray-50 p-2 rounded shadow-sm focus:ring-2 focus:ring-blue-200 focus:z-10 transform transition-transform duration-200 focus:translate-y-[-1px]"
          >
            <option value="Prints">Prints</option>
            <option value="Stickers">Stickers</option>
            <option value="Merchandising">merchandising</option>
            <option value="Painting">Painting</option>
          </select>
        </div>

        <div className="flex flex-col mb-2">
          <label className="mb-1 font-medium">Image:</label>
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            disabled={submitting}
            className="w-full border border-gray-300 bg-gray-50 p-2 rounded shadow-sm focus:ring-2 focus:ring-blue-200 focus:z-10 transform transition-transform duration-200 focus:translate-y-[-1px]"
          />
        </div>

        <div className="mt-4">
          <button
            type="submit"
            disabled={submitting}
            className="text-white w-20 px-4 py-2 rounded bg-green-500 hover:bg-green-600 transition duration-300 ease-in-out"
          >
            Submit
          </button>
          <button
            onClick={closeCallback}
            className="text-white mt-2 bg-red-500 hover:bg-red-600  w-20 px-4 py-2 rounded transition duration-300 ease-in-out"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProductForm;
