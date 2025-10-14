import { defineStore } from "pinia";
import { computed, onMounted, ref } from "vue";

export const useAppointmentsStore = defineStore("appointments", () => {
  const services = ref([]);
  const date = ref("");
  const hours = ref([]);
  const time = ref("");

  const isServiceSelected = computed(() => {
    return (id) => services.value.some((service) => service._id === id);
  });

  const totalAmount = computed(() => {
    return services.value.reduce((total, service) => total + service.price, 0);
  });

  const isSomeServiceSelected = computed(() => {
    return services.value.length > 0;
  });

  const isValidReservation = computed(() => {
    return services.value.length > 0 && date.value !== "" && time.value !== "";
  });

  onMounted(() => {
    const startHour = 10;
    const endHour = 19;

    for (let hour = startHour; hour <= endHour; hour++) {
      hours.value.push(`${hour}:00`);
    }
  });

  function onServiceSelect(service) {
    if (
      services.value.some(
        (selectedService) => selectedService._id === service._id
      )
    ) {
      services.value = services.value.filter(
        (selectedService) => selectedService._id !== service._id
      );
    } else {
      if (services.value.length === 2) {
        alert("Solo puedes seleccionar dos servicios");
        return;
      }
      services.value.push(service);
    }
  }

  function createAppointment() {
    const appointment = {
      services: services.value.map((service) => service._id),
      date: date.value,
      time: time.value,
      totalAmount: totalAmount.value,
    };

    console.log(appointment);
  }

  return {
    services,
    isServiceSelected,
    totalAmount,
    isSomeServiceSelected,
    onServiceSelect,
    date,
    hours,
    time,
    isValidReservation,
    createAppointment,
  };
});
