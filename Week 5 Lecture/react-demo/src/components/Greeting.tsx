type GreetingProps = {
    firstname: string;
    lastname: string;
};

export default function Greeting({firstname, lastname}: GreetingProps) {
    return <h2>Hello {firstname} {lastname}! from Greeting Component</h2>
}

