import TicketForm from "../components/TicketForm";

function BookTicket() {

  return (

    <div className="p-8">

      <div className="max-w-5xl mx-auto">

        {/* PAGE HEADER */}

        <div className="mb-10 text-center">

          <h1 className="text-3xl font-semibold text-slate-800">
            Book Metro Ticket
          </h1>

          <p className="text-slate-600 mt-2">
            Select your travel stations and generate a QR-based metro ticket.
          </p>

        </div>

        {/* FORM */}

        <div className="flex justify-center">
          <TicketForm />
        </div>

      </div>

    </div>

  );

}

export default BookTicket;