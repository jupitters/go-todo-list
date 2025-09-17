import { BASE_URL } from "@/App";
import { Button, Flex, Input, Spinner } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";

const TodoForm = () => {
	const [newTodo, setNewTodo] = useState("");
	const [isPending, setIsPending] = useState(false);

	const {mutate:createTodo,isPending:isCreating} = useMutation({
        mutationKey:["createTodo"],
        mutationFn:async (e) => {
            e.preventDefault()
            try {
                const res = await fetch(BASE_URL + `/todos`, {
                    method: "POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify({body: newTodo}),
                })
                const data = await res.json();

                if(!res.ok){
                    throw new Error(data.error || "Something went Wrong!")
                }

                setNewTodo("");
                return data;
            }catch (err){
                console.log(err)
            }
        }
    });

	return (
		<form onSubmit={createTodo}>
			<Flex gap={2}>
				<Input
					type='text'
					value={newTodo}
					onChange={(e) => setNewTodo(e.target.value)}
					ref={(input) => input && input.focus()}
				/>
				<Button
					mx={2}
					type='submit'
					_active={{
						transform: "scale(.97)",
					}}
				>
					{isPending ? <Spinner size={"xs"} /> : <IoMdAdd size={30} />}
				</Button>
			</Flex>
		</form>
	);
};
export default TodoForm;