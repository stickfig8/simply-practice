import { useTuner } from "../hooks/useTuner";

export default function Tuner() {
    const {note, freq, cents} = useTuner();

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold">Tuner</h2>
            {note ? (
                <p>
                    <strong>{note}</strong> ({freq} Hz) <br />
                    {cents} cents
                </p>
            ) : (
                <p>Listening...</p>
            )}
        </div>
    );
}