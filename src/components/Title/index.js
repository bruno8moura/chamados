import "./title.css";

export default function Title({ children, name }) {
  return (
    <main className="title">
      {children}
      <span>{name}</span>
    </main>
  );
}
