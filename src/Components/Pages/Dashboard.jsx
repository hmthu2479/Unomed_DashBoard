import 'primeflex/primeflex.css';
import centerImg from '../../../assets/center-img.png'
import untitled from '../../../assets/Untitled.png'
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
<<<<<<<< HEAD:src/Components/Pages/Dashboard.jsx
import '../Style/Main.css';
========
import '../../CSS/Main.css'
>>>>>>>> 43a67bc5dd26a353eacb9a93567bbfde82059b73:src/Components/Pages/Main/Dashboard.jsx

const Dashboard = () =>{
    const searchFooter = (
        <div className="custom searchFooter">
            <IconField iconPosition="right">
                <InputIcon className="pi pi-search"> </InputIcon>
                <InputText v-model="value1" placeholder="Finde Kontakte" />
            </IconField>
        </div>
    );

    const connectFooter = (
        <div className="custom connectFooter">
            <Button>
                Praxis verbinden <i className="pi pi-plus ml-2 text-xs"></i>
            </Button>
        </div>
    );


   const sendFooter = (
        <div className="custom sendFooter">
            <Button>
            Sende uns eine Rückmeldung <i className="pi pi-send ml-2 text-xs"></i>
            </Button>
        </div>
    );
    return(
        <div className="flex justify-content-between align-items-center flex-wrap w-screen bg-gray-100 custom-dashboard">
            <div className="content custom-content">
                <img src={untitled} className='w-6' alt="" />
                <h3>Herzlich Willkommen Michael Pecker</h3>
                <p>auf der Unomed Chat Platform! Wir freuen uns sehr, 
                    Sie hier begrüßen zu dürfen. Unser Team steht Ihnen jederzeit zur Verfügung, 
                    um Ihre Fragen zu beantworten und Sie bestmöglich zu unterstützen.
                     Zögern Sie nicht, uns bei Bedarf zu kontaktieren.<br/>Viel Spaß beim Erkunden unserer Plattform!</p>
                <p>Freundliche Grüße</p>
                <p>Das Unomed Team</p>
            </div>
            <div className="image-container">
                 <img src={centerImg} className="custom-center-image" alt="" />
            </div>
            <div className="card container custom-cards">
                <div className="card flex flex-column justify-content-between gap-3">
                    <Card title="Finde die besten Spezialisten" footer={searchFooter} className=" md:w-20rem md:h-8rem">
                        <p className="m-0">
                        Durchsuchen Sie unser Teilnehmerverzeichnis und finden sie die beten Spezialisten in ihrer Region. </p>
                    </Card>
                    <Card title="Mit ihrer Praxis verbinden" footer={connectFooter} className="md:w-20rem md:h-8rem">
                        <p className="m-0">
                        Sie können sich in ihrem Profil mit ihrem Hausarzt, ihren Spezialisten und Therapeuten verbinden.</p>
                    </Card>
                    <Card title="Sende uns eine Rückmeldung" footer={sendFooter} className="md:w-20rem md:h-8rem">
                        <p className="m-0">
                        Wir freuen uns immer, von Ihnen zu hören. Ihr Feedback wird uns helfen, besser zu werden. </p>
                    </Card>
            </div>
            </div>
        </div>

    );
};
export default Dashboard;