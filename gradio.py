import gradio as grd
import base64
import os

def process_inputs(audio_path, image_path):
    speech_to_text_output = transcribe(audio_path)

    if image_path:
        llava_output = img2txt(speech_to_text_output, image_path)
    else:
        llava_output = "no image uploaded"

    processed_audio = text_to_speech(llava_output, 'output.mp3')

    return speech_to_text_output, llava_output, processed_audio

# Gradio interface setup
inter = grd.Interface(
    fn=process_inputs,
    inputs=[
        grd.Audio(source="microphone", type="filepath"),
        grd.Image(type="filepath")
    ],
    outputs=[
        grd.Textbox(label="Speech to Text Output"),
        grd.Textbox(label="Llava Output"),
        grd.Audio(label="Processed Audio")
    ],
    title="Learn From LLava",
    description="Upload an image and ask questions about it. The chatbot will keep the context of the image and respond accordingly."
)

inter.launch(server_name="0.0.0.0", server_port=7860, share=True, debug=True)
