import { useContext } from "react";
import { ModalContext } from "../context/ModalContext";

const TermsConditions = () => {
  const { setModalType, setShowModal } = useContext(ModalContext);
  return (
    <div className="flex flex-col p-2 items-center h-[60vh] overflow-y-scroll">
      <h4 className="flex self-center my-4 text-gray-700">
        Regulamin korzystania z serwisu{" "}
        <span className="ml-1 font-bold ">Fixit</span>
      </h4>

      <p className="text-sm text-gray-500">
        Korzystanie z serwisu jest jednoznaczne z akceptacją postanowień
        Regulaminu. Serwis <span className="ml-1 font-bold ">Fixit</span>{" "}
        umożliwia publikowanie zleceń dotyczących naprawy sprzętów różnego
        rodzaju oraz składanie propozycji na powyższe zlecenia. Każdy użytkownik
        zobowiązany jest do korzystania z serwisu zgodnie z niniejszym
        Regulaminem, obowiązującym prawem, ogólnymi zasadami korzystania z sieci
        Internet, zasadami współżycia społecznego oraz celami utworzenia strony
        w sposób nie naruszający praw osób trzecich oraz praw właściciela.W
        przypadku stwierdzenia, że Użytkownik narusza powyższe zasady właściciel
        serwisu ma prawo usunąć publikowane przez Użytkownika treści, usunąć
        konto Użytkownika oraz podjąć wszelkie działania prowadzące do
        naprawienia poniesionej w związku z tym szkody.
      </p>

      <h5 className="flex self-start mt-2 text-gray-700">
        Ograniczenia wiekowe
      </h5>
      <p className="text-sm text-gray-500">
        Użytkownik musi mieć ukończone 18 lat. Korzystając z niniejszego
        serwisu, oświadczasz, że masz ukończone 18 lat i możesz prawnie
        przestrzegać postanowień niniejszej Regulaminu. . Serwis
        <span className="ml-1 font-bold ">Fixit </span> nie ponosi
        odpowiedzialności za zobowiązania związane z wprowadzaniem w błąd co do
        wieku.
      </p>
      <h5 className="flex self-start mt-2 text-gray-700">Prawa autorskie</h5>
      <p className="text-sm text-gray-500">
        Żadna część serwisu <span className="ml-1 font-bold ">Fixit </span>{" "}
        (m.in. teksty, dokumenty, pliki, układy graficzne, grafiki, zdjęcia,
        filmy) nie może być powielana lub rozpowszechniana w jakiejkolwiek
        formie lub w jakikolwiek sposób (elektroniczny lub mechaniczny) włącznie
        z kopiowaniem, drukowaniem, fotokopiowaniem, nagrywaniem na taśmy,
        dyskietki, płyty CV/DVD lub przy użyciu innych systemów i środków, bez
        zgody właściciela, chyba że Regulamin stanowi inaczej. Zawartość serwisu
        internetowego, w tym jego treść, kształt, wizerunek graficzny i
        konstrukcja chroniona jest polskim i międzynarodowym prawem autorskim.
        Prawa do wszystkich materiałów zamieszczonych na stronie zastrzeżone są
        na rzecz właściciela bądź innych podmiotów uprawnionych (np. partnerów).
        Pobieranie i kopiowanie treści, w szczególności dokumentów i zdjęć
        znajdujących się na stronie internetowej jest dozwolone wyłącznie po
        uzyskaniu pisemnej zgody właściciela. Zgoda może być udzielona za
        pośrednictwem poczty elektronicznej. Naruszenie licencji i praw
        autorskich przez Użytkownika skutkuje odpowiedzialnością prawną
        określoną w szczególności w przepisach ustawy o prawie autorskim i
        prawach pokrewnych, ustawy o zwalczaniu nieuczciwej konkurencji,
        przepisach kodeku cywilnego lub przepisach prawa prasowego.
      </p>

      <h5 className="flex self-start mt-2 text-gray-700">
        Odpowiedzialność za treść
      </h5>
      <p className="text-sm text-gray-500">
        {" "}
        Właściciel serwisu
        <span className="ml-1 font-bold ">Fixit</span> odpowiada jedynie za
        treści własne zamieszczone w serwisie. Właściciel nie ponosi
        odpowiedzialności za prawidłowość, aktualność, kompletność materiałów
        udostępnianych na stronie internetowej jak również za materiały
        udostępnione przez osoby trzecie. Właściciel serwisu nie ponosi
        odpowiedzialności za utrudnienia i brak dostępu do serwisu, spowodowane
        czynnikami niezależnymi od niego. Właściciel zastrzega sobie prawo
        zmiany treści zawartych w serwisie internetowym, jego uzupełniania,
        skracania lub całkowitego wycofania. W serwisie internetowym mogą być
        umieszczone linki do adresów internetowych podmiotów trzecich, na
        których treść właściciel nie ma żadnego wpływu. Za treści znajdujące się
        pod linkowanymi adresami odpowiadają wyłącznie ich operatorzy.
      </p>
      <h5 className="flex self-start mt-2 text-gray-700">
        Ochrona prywatności
      </h5>
      <p className="text-sm text-gray-500">
        Wypełniając oraz przesyłając dane za pomocą formularza rejestracyjnego
        oraz edycyjnego Użytkownik wyraża zgodę na przetwarzanie przez
        właściciela serwisu <span className="ml-1 font-bold ">Fixit</span>{" "}
        swoich danych osobowych. Na żądanie właściwego urzędu, sądu lub organów
        ścigania, właściciel ma prawo ujawnić dane osobowe Użytkownika, jeśli
        jest to konieczne do celów przeprowadzenia postępowania, zwłaszcza
        postępowania karnego, zwalczania zagrożeń przez policję, wypełniania
        zadań ustawowych państwowych urzędów ochrony danych osobowych,
        państwowych służb wywiadowczych lub kontrwywiadu wojskowego, albo do
        dochodzenia praw własności intelektualnej. Udostępnienie danych
        osobowych podmiotom trzecim w sytuacjach innych niż opisane powyżej,
        jest niedozwolone. Hasła dostępu do strony internetowej nie należy
        podawać osobom trzecim. Przy opuszczaniu strony Użytkownik powinien się
        wylogować i zamknąć przeglądarkę
      </p>
      <button
        className="p-2 my-4 rounded-lg bg-gray-800 w-[5rem] text-white text-sm"
        onClick={() => {
          setModalType("");
          setShowModal(false);
        }}
      >
        Zamknij
      </button>
    </div>
  );
};

export default TermsConditions;
