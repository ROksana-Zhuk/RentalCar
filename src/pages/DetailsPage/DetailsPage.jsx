import { useParams } from "react-router-dom";
import Container from "../../components/Container/Container.jsx";
import { useEffect, useState } from "react";
import { getCarDetails } from "../../services/carService.jsx";
import BookingForm from "../../components/BookingForm/BookingForm.jsx";
import DetailsCar from "../../components/DetailCar/DetailsCar.jsx";
import css from './DetailsPage.module.css'


export default function DetailsPage() {

    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [carDetails, setCarDetails] = useState(null)

    useEffect(() => {
      const fetchСarData = async () => {
          setIsLoading(true);
          try {
              const carData = await getCarDetails(id);
              setCarDetails(carData);
          } catch (error) {
              console.error('Error fetching car details:', error);
          } finally {
              setIsLoading(false);
          }
      };

      fetchСarData();
    }, [id]);


  return (
    <section>
        <Container>

            {carDetails && (
                <div className={css.wrap}>
                    <div className={css.box}>
                        <img src={carDetails.img}
                             alt={carDetails.description}
                             className={css.image}
                             width="640"
                             height="512"/>

                        <BookingForm/>
                    </div>

                    <DetailsCar car={carDetails}/>
                </div>
            )}


        </Container>
    </section>
  );
}

