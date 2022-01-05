const OrderItemModel = require("../models/order-item.model.js");
const OrderModel = require("../models/order.model.js");
const ProductModel = require("../models/product.model.js");
const CartModel = require("../models/cart.model.js");

// object for response in console
const response = {
  success: true,
  message: "",
};

const getCartItems = async (req, res) => {
  const orderedBy = req.user.id;
  const cartItems = await CartModel.findOne({ orderedBy: orderedBy }).populate(
    // "cartItems"
    [
      {
        path: "cartItems",
        // select: "productId",
        populate: {
          path: "productId",
          model: "product",
        },
      },
      // {
      //   path: "orderedBy",
      // },
    ]
  );
  res.send(cartItems);
};

const addCartItems = async (req, res) => {
  let flag = true;
  //   const { orderedBy, productId, productQty } = req.body;
  const orderedBy = req.user.id;
  const { orderItems, address } = req.body;
  //   const orderItem = {
  //     orderedBy: orderedBy,
  //     productId: productId,
  //     productQty: productQty,
  //   };
  const orderArray = [];
  for (let index = 0; index < orderItems.length; index++) {
    const element = orderItems[index];
    await ProductModel.findOne({ _id: element.productId })
      .then(async (result) => {
        if (!result) {
          response.success = false;
          response.message = `Product ${element.productId} not found`;
          console.log(response);
          flag = false;
          if (orderArray.length != 0) {
            for (let i = 0; i < orderArray.length; i++) {
              const el = orderArray[i];
              await OrderItemModel.findOneAndDelete({ _id: el }).then(
                (result) => {
                  if (result) {
                    response.success = true;
                    response.message = `Product with id ${result._id} deleted succesfully from orderItemModel`;
                    console.log(response);
                  }
                }
              );
            }
          }
          return res
            .status(404)
            .send(`Product (${element.productId}) not found`);
        } else {
          await OrderItemModel.create({
            orderedBy: orderedBy,
            productId: element.productId,
            productQty: element.productQty,
          })
            .then(async (result) => {
              if (result) {
                response.success = true;
                response.message = `Order item ${index + 1} added succesfully`;
                console.log(response);
                orderArray.push(result._id);
                //   res.status(200).send(result);
              }
            })
            .catch((error) => {
              response.success = false;
              response.message = `Some error occured ${index + 1}`;
              console.log({ response, error: error.message });
              // res.send(error.message);
            });
        }
      })
      .catch((err) => {
        response.success = false;
        response.message = "Some error occured";
        return res.status(500).send(err.message);
      });
  }

  if (flag) {
    const intialCart = await CartModel.findOne({ orderedBy: orderedBy });
    console.log("INITIAL CART1 => ", intialCart);

    if (!intialCart) {
      response.success = null;
      response.message = "Cart is empty";
      console.log(response);
      console.log("INITIAL CART2 => ", intialCart);
      await CartModel.create({
        orderedBy: orderedBy,
        cartItems: orderArray,
      })
        .then((result) => {
          console.log("RESULT1 => ", result);
          if (result) {
            response.success = true;
            response.message = "Cart added succesfully";
            console.log(response);
            res.json(result);
          } else {
            res.send("Result not found");
          }
        })
        .catch((error) => {
          response.success = false;
          response.message = "Some error occured";
          console.log(response);
          res.send(error.message);
        });
    } else {
      console.log("INITIAL CART3 => ", intialCart);
      await CartModel.findOneAndUpdate(
        { orderedBy: orderedBy },
        { $set: { cartItems: intialCart.cartItems.concat(orderArray) } },
        { $new: true }
      )
        .then((result) => {
          console.log("RESULT => ", result);
          if (result) {
            response.success = true;
            response.message = "Cart updated succesfully";
            console.log(response);
            res.status(200).send(result);
          } else {
            res.status(404).send("Result not found 2");
          }
        })
        .catch((error) => {
          response.success = false;
          response.message = "Some error occured";
          console.log(response);
          res.status(500).send(error.message);
        });
    }
  }
};

const updateCartItem = async (req, res) => {
  const orderedBy = req.user.id;
  const { cartItemId } = req.params;
  const { productQty } = req.body;
  await OrderItemModel.findOne({ _id: cartItemId })
    .then(async (cartItem) => {
      if (cartItem.orderedBy != orderedBy) {
        response.success = false;
        response.message = "User can update only own order items";
        return res.status(404).send("Action not allowed");
      }
      await OrderItemModel.findOneAndUpdate(
        { _id: cartItemId },
        { $set: { productQty: productQty } },
        { $new: true }
      )
        .then((result) => {
          response.success = true;
          response.message = "Cart item updated succesfully";
          console.log(response);
          res.json({ message: "Updated Cart Item", cartItem: result });
        })
        .catch((err) => {
          response.success = false;
          response.message = "Some error occured";
          return res.status(500).send(err.message);
        });
    })
    .catch((err) => {
      response.success = false;
      response.message = "Some error occured";
      return res.status(500).send(err.message);
    });
};

const deleteCartItem = async (req, res) => {
  const orderedBy = req.user.id;
  const { cartItemId } = req.params;
  await OrderItemModel.findOne({ _id: cartItemId })
    .then(async (cartItem) => {
      if (cartItem.orderedBy != orderedBy) {
        response.success = false;
        response.message = "User can delete only own order items";
        return res.status(404).send("Action not allowed");
      }
      await OrderItemModel.findOneAndDelete({ _id: cartItemId })
        .then((result) => {
          response.success = true;
          response.message = "Cart item deleted succesfully";
          console.log(response);
          res.json({ message: "Deleted Cart Item", deletedCartItem: result });
        })
        .catch((err) => {
          response.success = false;
          response.message = "Some error occured";
          return res.status(500).send(err.message);
        });
    })
    .catch((err) => {
      response.success = false;
      response.message = "Some error occured";
      return res.status(500).send(err.message);
    });
};

const getOrders = async (req, res) => {
  const orderedBy = req.user.id;
  await OrderModel.find({ orderedBy: orderedBy })
    .then((result) => {
      if (result) {
        response.success = true;
        response.message = "Cart updated succesfully";
        console.log(response);
        res.status(200).send({ numOfOrders: result.length, orders: result });
      } else {
        response.success = null;
        response.message = "No Orders found";
        console.log(response);
        res.status(200).send("No orders found");
      }
    })
    .catch((err) => {
      response.success = false;
      response.message = "Some error occured";
      console.log(response);
      res.send(error.message);
    });
};

const placeOrder = async (req, res) => {
  const orderedBy = req.user.id;
  const { address } = req.body;
  await CartModel.findOne({ orderedBy: orderedBy })
    .then(async (result) => {
      if (!result) {
        response.success = false;
        response.message = "Cart is empty";
        console.log(response);
        res.send("Cart is empty");
      } else {
        await OrderModel.create({
          orderedBy: orderedBy,
          orderItems: result.cartItems,
          address: address,
        })
          .then(async (result) => {
            if (result) {
              response.success = true;
              response.message = "Order placed succesfully";
              console.log(response);
              res.status(200).send(result);
              await CartModel.findOneAndDelete({ orderedBy: orderedBy })
                .then((result) => {
                  response.success = true;
                  response.message = "Cart truncated successfully";
                  console.log(response);
                })
                .catch((error) => {
                  response.success = false;
                  response.message = "Some error occured";
                  console.log(response);
                });
            }
          })
          .catch((error) => {
            response.success = false;
            response.message = "Some error occured";
            console.log(response);
            res.send(error.message);
          });
      }
    })
    .catch((err) => {
      response.success = false;
      response.message = "Some error occured";
      console.log(response);
      res.send(err.message);
    });
};

const cancelOrder = async (req, res) => {
  const orderedBy = req.user.id;
  const { cartId } = req.params;
  await OrderModel.findOne({ _id: cartId })
    .then(async (result) => {
      if (result) {
        if (result.orderedBy != orderedBy) {
          response.success = false;
          response.message = "Cannot delete other's order";
          console.log(response);
          res.send("Action not allowed");
        } else {
          await OrderModel.findOneAndDelete({ _id: cartId })
            .then((result) => {
              response.success = true;
              response.message = "Order Cancelled";
              console.log(response);
              res.status(200).send({
                message: "Order Cancelled",
                deletedCart: result,
              });
            })
            .catch((error) => {
              response.success = false;
              response.message = "Some error occured";
              console.log(response);
              res.status(500).send(error.message);
            });
        }
      } else {
        response.success = false;
        response.message = "Order not found";
        console.log(response);
        res.status(404).send("Order not found");
      }
    })
    .catch((err) => {
      response.success = false;
      response.message = "Some error occured";
      console.log(response);
      res.send(err.message);
    });
};

module.exports = {
  addCartItems,
  getCartItems,
  updateCartItem,
  deleteCartItem,
  placeOrder,
  cancelOrder,
  getOrders,
};
