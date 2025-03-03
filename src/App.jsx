import "./App.css";
import {
    Typography,
    TextField,
    Card,
    CardContent,
    Box,
    Button,
    Stack,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";

const API_ENDPOINT =
    "https://ec2-13-215-183-220.ap-southeast-1.compute.amazonaws.com/v1/chat/completions";

function App() {
    const [prompt, setPrompt] = useState("");
    const [rule, setRule] = useState("");
    const [description, setDescription] = useState("");
    const [phase, setPhase] = useState("");

    const handleSubmit = async () => {
        try {
            const response = await axios.post(
                API_ENDPOINT,
                {
                    prompt: prompt, // Replace or pass dynamically
                    phase: phase,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.data && response.data.response) {
                setRule(response.data.response.rule);
                setDescription(response.data.response.description);
            }
        } catch (error) {
            console.error("Error fetching rule:", error);
            setDescription("Failed to fetch rule. Please try again.");
        }
    };

    return (
        <Stack spacing={2}>
            <Typography variant="h3" gutterBottom>
                AI Assistant
            </Typography>
            <Stack
                spacing={2}
                direction={"row"}
                sx={{
                    justifyContent: "space-evenly",
                    alignItems: "center",
                }}
            >
                <TextField
                    id="outlined-multiline-flexible"
                    label="Phase"
                    multiline
                    maxRows={4}
                    value={phase}
                    onChange={(e) => setPhase(e.target.value)}
                />
                <TextField
                    id="outlined-multiline-flexible"
                    label="Prompt"
                    multiline
                    maxRows={4}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                />
                <Button variant="contained" onClick={handleSubmit}>
                    Hello
                </Button>
            </Stack>

            <Card sx={{ maxWidth: 600, p: 2, boxShadow: 3 }}>
                <CardContent>
                    <Typography variant="h6" fontWeight="bold">
                        When incoming requests match...
                    </Typography>
                    <Box
                        sx={{
                            backgroundColor: "#f5f5f5",
                            padding: 1.5,
                            borderRadius: 1,
                            fontFamily: "monospace",
                            fontSize: "1rem",
                            mt: 1,
                        }}
                    >
                        {rule}
                    </Box>
                    <Typography variant="subtitle1" fontWeight="bold" mt={2}>
                        Your rule explained
                    </Typography>
                    <Typography variant="body2">{description}</Typography>
                </CardContent>
            </Card>
        </Stack>
    );
}

export default App;
