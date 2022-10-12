# SPORTERTEAM
<img src="https://raw.githubusercontent.com/ManuelCebreiro/SporterTeam/03b885e4504644601b6d301c74ac2d1630a38edc/src/front/img/PAGINA%20WEB.png">

A social app to find football, basketball, tennis and padel matches. An external API is used to host users profiles photopraphies. Users can create a match or join a sport match previously created by other user. 

## Authors ✒️ LinkedIn

- MARTIN BARJA BALSEIRO (www.linkedin.com/in/martin-barja-balseiro/)
- MANUEL CEBREIRO RUIZ DE CORTAZAR (www.linkedin.com/in/manuelcebreiro/)
- DAVID PIZARRO PALANCAR (www.linkedin.com/in/david-pizarro-developer/)

## WEBSITE🌐

https://sporterteam.herokuapp.com/

## Contact 📧 EMAIL

- MARTIN BARJA BALSEIRO (barjabalseiro@gmail.com)
- MANUEL CEBREIRO RUIZ DE CORTAZAR (cebreirom@gmail.com)
- DAVID PIZARRO PALANCAR (pizarro.developer@gmail.com)



## Tools

- React Hooks - useState, useEffect, use Context
- React Router Dom - Link, useNavigate, useParams
- React Hook Form - useForm
- React Bootstrap - Nav, Navbar
- CSS and Bootstrap
- Form Handling in React
- Data Fetching in React
- Environment Variables; Sweetalert, React Styled Components



## Resources & References

- [External API](https://cloudinary.com/)
- [SweetAlert](https://sweetalert.js.org/)

### Back-End Manual Installation:

It is recomended to install the backend first, make sure you have Python 3.8, Pipenv and a database engine (Posgress recomended)

1. Install the python packages: `$ pipenv install`
2. Create a .env file based on the .env.example: `$ cp .env.example .env`
3. Install your database engine and create your database, depending on your database you have to create a DATABASE_URL variable with one of the possible values, make sure yo replace the valudes with your database information:

| Engine    | DATABASE_URL                                        |
| --------- | --------------------------------------------------- |
| SQLite    | sqlite:////test.db                                  |
| MySQL     | mysql://username:password@localhost:port/example    |
| Postgress | postgres://username:password@localhost:5432/example |

4. Migrate the migrations: `$ pipenv run migrate` (skip if you have not made changes to the models on the `./src/api/models.py`)
5. Run the migrations: `$ pipenv run upgrade`
6. Run the application: `$ pipenv run start`

### Front-End Manual Installation:

- Make sure you are using node version 14+ and that you have already successfully installed and runned the backend.

1. Install the packages: `$ npm install`
2. Start coding! start the webpack dev server `$ npm run start`

## INSTALL REACT-HOOK-FORM

npm install react-hook-form

## INSTALL SWEETALERT

$ npm install --save sweetalert

## INSTALL STYLED COMPONENTS EN REACT

npm install --save styled-components

