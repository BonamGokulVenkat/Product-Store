import { toaster } from '@/components/ui/toaster';
import {
    Box,
    Button,
    Heading,
    HStack,
    Image,
    Input,
    Text,
    VStack
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { MdEdit, MdDelete } from "react-icons/md";
import { useProductStore } from '@/store/product.js';
import {
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
} from "@/components/ui/dialog";

function ProductCard({ product }) {
    const [updatedProduct, setUpdatedProduct] = useState(product);
    const { deleteProduct, updateProduct } = useProductStore();
    const [isOpen, setIsOpen] = useState(false);

    const handleEditClick = () => {
        setUpdatedProduct(product);
        setIsOpen(true);
    };

    const handleDeleteProduct = async (pid) => {
        const { success } = await deleteProduct(pid);
        toaster.create({
            title: success ? "Deleted successfully" : "Deletion failed",
            type: success ? "success" : "error",
        });
    };

    const handleUpdateProduct = async (pid, updatedProduct) => {
        const { success } = await updateProduct(pid, updatedProduct);
        if (success) {
            toaster.create({
                title: "Product updated successfully",
                type: "success",
            });
            setIsOpen(false); // Close dialog after update
        } else {
            toaster.create({
                title: "Update failed",
                type: "error",
            });
        }
    };

    return (
        <Box
            shadow='lg'
            rounded='lg'
            overflow='hidden'
            transition='all 0.3s'
            _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
        >
            <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />
            <Box p={4}>
                <Heading as='h3' size='md' mb={2}>
                    {product.name}
                </Heading>
                <Text fontWeight='bold' fontSize='xl' mb={4}>
                    ${product.price}
                </Text>
                <HStack spacing={2}>
                    <Button onClick={handleEditClick} leftIcon={<MdEdit />} aria-label="Edit Product">
                        Edit
                    </Button>
                    <Button onClick={() => handleDeleteProduct(product._id)} leftIcon={<MdDelete />} aria-label="Delete Product">
                        Delete
                    </Button>
                </HStack>
            </Box>

            {/* Dialog Component */}
            <DialogRoot open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Product</DialogTitle>
                        <DialogCloseTrigger asChild>
                            <Button variant="ghost" onClick={() => setIsOpen(false)}>Close</Button>
                        </DialogCloseTrigger>
                    </DialogHeader>
                    <DialogBody>
                        <VStack spacing={4}>
                            <Input
                                placeholder='Product Name'
                                name='name'
                                value={updatedProduct.name}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                            />
                            <Input
                                placeholder='Price'
                                name='price'
                                type='number'
                                value={updatedProduct.price}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                            />
                            <Input
                                placeholder='Image URL'
                                name='image'
                                value={updatedProduct.image}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
                            />
                        </VStack>
                    </DialogBody>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            colorScheme='blue'
                            mr={3}
                            onClick={() => handleUpdateProduct(product._id, updatedProduct)}
                        >
                            Update
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </DialogRoot>
        </Box>
    );
}

export default ProductCard;
