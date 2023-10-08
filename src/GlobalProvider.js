import React, { createContext, useState } from "react";
const initialSheets = [
  { name: "sheet", workbooks: [], rows: [], cols: [], realData: [], Plot: [] },
];
const initialDashboards = [{ name: "dashboard", graphs: [0, 1, 2, 3, 4, 5] }];
const initialStorys = [{ name: "story", buttonContain: [] }];
const initialContainer = [{ name: "container", containers: [0] }];

export const GlobalContext = createContext({});

export const GlobalProvider = ({ children }) => {
  const [sheets, setSheets] = useState(initialSheets);
  const [dashboards, setDashboards] = useState(initialDashboards);
  const [storys, setStorys] = useState(initialStorys);
  const [error, setError] = useState(null);
  const [userD, setUserData] = useState();
  const [loginUsername, setLoginUsername] = useState("");
  const [Luser, setLUser] = useState({ email: "", password: "", errors: {} });
  const [form, setForm] = useState();
  const [dataFormat, setDataFormat] = useState([]);
  const [numberofRows, setNumberofRows] = useState();
  const [numberofColumns, setNumberofColumns] = useState();
  const [categoricalData, setCategoricalData] = useState([]);
  const [categoryDataType, setCategoryDataType] = useState([]);
  const [numericalDataType, setNumericalDataType] = useState([]);
  const [numericalData, setnumericalData] = useState([]);
  const [allUnique, setallUnique] = useState([]);
  const [dataType, setDataType] = useState([]);
  const [container, setContainer] = useState(initialContainer);
  const [selectedStory, setSelectedStory] = useState();
  const [selectedSheet, setSelectedSheet] = useState();
  const [selectedDashboard, setSelectedDashboard] = useState();

  const [columns, setColumns] = useState([]);
  const [selectedWB, setSelectedWB] = useState();
  const [selectedWBSheet, setSelectedWBSheet] = useState();
  const [sortType, setSortType] = useState();
  const [sort, setSort] = useState();
  const [filterValue, setFilterValue] = useState(0);
  const [filterOperator, setFilterOperator] = useState();
  const [filterType, setFilterType] = useState();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpe, setIsOpe] = useState(false);
  const [newfield, setNewField] = useState();
  const [selectCondition, setSelectedCondition] = useState();
  const [dropValue, setDropValue] = useState();
  const [value, setValue] = useState();
  const [ifText, setIftext] = useState();
  const [elseText, setElsetext] = useState();
  const [operator1, setOperator1] = useState();
  const [showMenu, setShowMenu] = useState(false);
  let [nullCount, setNullCount] = useState(0);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const [disableComponenet, setDisableComponent] = useState();
  const [us, setUs] = useState([{}]);
  const [Uname, setUname] = useState();
  const [Upassword, setUpassword] = useState();
  const [matchedUser, setMatchUser] = useState();
  const [authenticated, setAuthenticated] = useState(null);
  const [rowLength, setRowLength] = useState();
  const [loading, setLoading] = useState(false);
  const [bufferingModal, setBufferingModal] = useState();
  const [fileName, setFileName] = useState();
  const [modalIsOpenFilter, setIsOpenFilter] = useState(false);
  const [selectValue, setSelectValue] = useState();
  const [selected, setSelected] = useState();
  const [dbname, setdbNames] = useState();
  const [modalIsOpens, setIsOpensql] = useState(false);
  const [serverDetails, setServerDetails] = useState({
    name: "",
    portNumber: "",
    user: "",
    password: "",
    database: "",
  });
  const [dbTableNames, setdbTableNames] = useState();
  const [databaseNames, setdatabaseName] = useState({
    databaseName: "",
    databaseTableName: "",
  });
  const [sequelQuery, setSequelQuery] = useState(false);
  const [queryW, setQueryW] = useState();
  const [latforWeather, setLatforWeather] = useState();
  const [lonforWeather, setLonforWeather] = useState();
  const [modalforWeather, setModalforWeather] = useState();
  const [serchwithCity, setSearchwithCity] = useState();
  const [openRenameModal, setRenameModal] = useState(false);
  const [pathlocation, setPathLocation] = useState();
  const [registerOTP, setRegisterOTP] = useState();

  return (
    <GlobalContext.Provider
      value={{
        registerOTP,
        setRegisterOTP,
        pathlocation,
        setPathLocation,
        selectedDashboard,
        setSelectedDashboard,
        openRenameModal,
        setRenameModal,
        serchwithCity,
        setSearchwithCity,
        latforWeather,
        setLatforWeather,
        lonforWeather,
        setLonforWeather,
        modalforWeather,
        setModalforWeather,
        queryW,
        setQueryW,
        sequelQuery,
        setSequelQuery,
        serverDetails,
        setServerDetails,
        databaseNames,
        setdatabaseName,
        dbTableNames,
        setdbTableNames,
        modalIsOpens,
        setIsOpensql,
        dbname,
        setdbNames,
        selected,
        setSelected,
        selectValue,
        setSelectValue,
        modalIsOpenFilter,
        setIsOpenFilter,
        fileName,
        setFileName,
        bufferingModal,
        setBufferingModal,
        loading,
        setLoading,
        rowLength,
        setRowLength,
        authenticated,
        setAuthenticated,
        error,
        setError,
        loginUsername,
        setLoginUsername,
        Luser,
        setLUser,
        userD,
        setUserData,
        form,
        setForm,
        user,
        setUser,
        us,
        setUs,
        Uname,
        setUname,
        Upassword,
        setUpassword,
        disableComponenet,
        setDisableComponent,
        matchedUser,
        setMatchUser,
        allUnique,
        setallUnique,
        dataType,
        setDataType,
        dataFormat,
        setDataFormat,
        categoricalData,
        categoryDataType,
        setCategoricalData,
        setCategoryDataType,
        numericalData,
        setnumericalData,
        numericalDataType,
        setNumericalDataType,
        nullCount,
        setNullCount,
        numberofRows,
        setNumberofRows,
        numberofColumns,
        setNumberofColumns,
        selectedStory,
        setSelectedStory,
        container,
        setContainer,
        storys,
        setStorys,
        showMenu,
        setShowMenu,
        operator1,
        setOperator1,
        value,
        setValue,
        ifText,
        setIftext,
        elseText,
        setElsetext,
        modalIsOpe,
        setIsOpe,
        modalIsOpen,
        setIsOpen,
        newfield,
        setNewField,
        selectCondition,
        setSelectedCondition,
        dropValue,
        setDropValue,
        filterValue,
        setFilterValue,
        filterOperator,
        setFilterOperator,
        filterType,
        setFilterType,
        sort,
        setSort,
        sortType,
        setSortType,
        columns,
        setColumns,
        sheets,
        setSheets,
        dashboards,
        setDashboards,
        selectedWB,
        setSelectedWB,
        selectedSheet,
        setSelectedSheet,
        selectedWBSheet,
        setSelectedWBSheet,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
