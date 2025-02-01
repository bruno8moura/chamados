import React from "react";
import { FiUsers } from "react-icons/fi";
import Header from "../../components/Header";
import Title from "../../components/Title";

function Customers() {
  return (
    <main>
      <section>
        <Header />
      </section>

      <section className="content">
        <Title name="Clientes">
          <FiUsers size={25} />
        </Title>
      </section>
    </main>
  );
}

export default Customers;
