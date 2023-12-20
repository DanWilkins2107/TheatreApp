import { View } from "react-native";
import { useState } from "react";
import FormField from "../../components/Form/FormField";
import SmallFormButton from "../../components/Form/SmallFormButton";

const report = (title, description) => {
	// send to firebase
};

export default function HelpScreen({type}) {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	// attachments

	return (
		<View>
			<FormField
				title="Title"
				onChange={setTitle}
				value={title}
				placeholder="Title"
			/>
			<FormField
				title="Description"
				onChange={setDescription}
				value={description}
				placeholder="Description"
				multiline
			/>
			<SmallFormButton title="Submit" />
		</View>
	);
}