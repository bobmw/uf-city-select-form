import { Autocomplete, Box, Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, TextField } from "@mui/material";
import useUfCityController from "../hooks/useUFCityController";

export default function UFCityForm() {
    const {
        ufSelected,
        districtSelected,
        ufError,
        districtError,
        ufList,
        districtListByUFSelected,
        handleUFChange,
        handleDistrictChange,
        handleSubmit
    } = useUfCityController();

    return (<form onSubmit={handleSubmit}>
        <Card>
            <CardHeader title='Formulário: Estado e cidade' />
            <Divider />
            <CardContent>
                <Grid container spacing={4}>
                    <Grid item xs={12} lg={6}>
                        <Autocomplete
                            loadingText={'carregando...'}
                            noOptionsText={'sem opções'}
                            options={ufList}
                            value={ufSelected}
                            onChange={handleUFChange}
                            renderInput={params => <TextField
                                {...params}
                                label="Selecione um estato (UF)"
                                error={ufError}
                                helperText={ufError && "Selecão obrigatória"} />}
                        />
                    </Grid>

                    <Grid item xs={12} lg={6}>
                        <Autocomplete
                            loadingText={'carregando...'}
                            noOptionsText={'sem opções'}
                            disabled={!ufSelected}
                            options={districtListByUFSelected}
                            getOptionLabel={option => option ? option.name : ''}
                            value={districtSelected || null}
                            onChange={handleDistrictChange}
                            renderInput={params => <TextField
                                {...params}
                                label="Selecione uma cidade"
                                error={districtError}
                                helperText={districtError && "Selecão obrigatória"} />}
                            renderOption={(props, option) => (
                                <Box component="li" {...props} key={option.id}>
                                    {option.name}
                                </Box>
                            )}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                        />
                    </Grid>
                </Grid>
            </CardContent>
            <Divider />
            <CardActions>
                <Box width='100%' display='flex' justifyContent='flex-end'>
                    <Button variant='contained' type='submit'>Enviar</Button>
                </Box>
            </CardActions>
        </Card>
    </form>);
}